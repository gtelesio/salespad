#!/bin/bash

# verify-flow.sh
# Simulates the full lead lifecycle using curl.

BASE_URL="http://localhost:3000/api/v1"
ROOT_URL="http://localhost:3000"
CONTENT_TYPE="Content-Type: application/json"

echo "🚀 Starting E2E Verification Flow..."

# Helper function to extract JSON values more reliably (simple parsing)
get_json_value() {
    # Extract "key":"value" pairs, then filter for the specific key requested.
    # We use sed to handle potential spacing and nested structures slightly better than simple grep.
    echo "$1" | grep -o "\"$2\":\"[^\"]*\"" | head -n 1 | cut -d':' -f2 | tr -d '"'
}

# 0. Check Root API (Metadata)
echo "--------------------------------------------------"
echo "0. Checking Root API Metadata..."
ROOT_RES=$(curl -s -X GET "$ROOT_URL")
echo "Root Response: $ROOT_RES"

if echo "$ROOT_RES" | grep -q "Salespad API"; then
    echo "✅ Root Metadata looks correct."
else
    echo "❌ Root Metadata Check Failed."
    exit 1
fi

# 1. Create Lead
echo "--------------------------------------------------"
echo "1. Creating Lead..."
RANDOM_ID=$((1 + $RANDOM % 100000))
EMAIL="test${RANDOM_ID}@example.com"

RESPONSE=$(curl -s -X POST "$BASE_URL/leads" \
  -H "$CONTENT_TYPE" \
  -d "{\"name\": \"Test User\", \"contactInfo\": \"$EMAIL\"}")

echo "Response Body: $RESPONSE"

# Parse Standardized Response
CORRELATION_ID=$(get_json_value "$RESPONSE" "correlationId")
LEAD_ID=$(get_json_value "$RESPONSE" "id")
STATUS=$(get_json_value "$RESPONSE" "status")

echo "Correlation ID: $CORRELATION_ID"
echo "Lead ID: $LEAD_ID"
echo "Status: $STATUS"

if [ -z "$LEAD_ID" ] || [ -z "$CORRELATION_ID" ]; then
    echo "❌ Failed to create lead or missing Correlation ID."
    exit 1
fi

# 2. Send Message
echo "--------------------------------------------------"
echo "2. Sending Message..."
SEND_RES=$(curl -s -X POST "$BASE_URL/leads/send" \
  -H "$CONTENT_TYPE" \
  -d "{\"leadId\": \"$LEAD_ID\", \"message\": \"Hello there\"}")

echo "Send Status: $SEND_RES"

echo "⏳ Waiting for Queue (3s)..."
sleep 3

# 3. Verify Contacted Status
echo "--------------------------------------------------"
echo "3. Verifying Contacted Status & Events..."
LEAD_CHECK=$(curl -s -X GET "$BASE_URL/leads/$LEAD_ID")
CURRENT_STATUS=$(get_json_value "$LEAD_CHECK" "status")

echo "Current Status: $CURRENT_STATUS"
if echo "$LEAD_CHECK" | grep -q "outbound"; then
    echo "✅ Outbound event found."
else
    echo "❌ Outbound event MISSING."
fi

# 4. Simulate Reply
echo "--------------------------------------------------"
echo "4. Simulating Reply..."
REPLY_RES=$(curl -s -X POST "$BASE_URL/leads/reply" \
  -H "$CONTENT_TYPE" \
  -d "{\"leadId\": \"$LEAD_ID\", \"content\": \"Tell me about pricing\"}")

echo "Reply Response: $REPLY_RES"

# 5. Trigger AI Reply
echo "--------------------------------------------------"
echo "5. Triggering AI Reply..."
AI_RES=$(curl -s -X POST "$BASE_URL/leads/ai-reply" \
  -H "$CONTENT_TYPE" \
  -d "{\"leadId\": \"$LEAD_ID\"}")

echo "AI Response: $AI_RES"

echo "⏳ Waiting for AI Queue (3s)..."
sleep 3

# 6. Final Check
echo "--------------------------------------------------"
echo "6. Final History Check..."
FINAL_LEAD=$(curl -s -X GET "$BASE_URL/leads/$LEAD_ID")
FINAL_STATUS=$(get_json_value "$FINAL_LEAD" "status")

echo "Final Status: $FINAL_STATUS"
echo "Full Lead Data: $FINAL_LEAD"

echo "--------------------------------------------------"
echo "🎉 Verification Complete."
