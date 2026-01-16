#!/bin/bash

# verify-flow.sh
# Simulates the full lead lifecycle using curl.

BASE_URL="http://localhost:3000"
CONTENT_TYPE="Content-Type: application/json"

echo "🚀 Starting E2E Verification Flow..."

# Helper function to extract JSON value
get_json_value() {
    cat | grep -o "\"$1\":\"[^\"]*\"" | cut -d':' -f2 | tr -d '"'
}

# 1. Create Lead
echo "--------------------------------------------------"
echo "1. Creating Lead..."
RANDOM_ID=$((1 + $RANDOM % 100000))
EMAIL="test${RANDOM_ID}@example.com"

RESPONSE=$(curl -s -X POST "$BASE_URL/leads" \
  -H "$CONTENT_TYPE" \
  -d "{\"name\": \"Test User\", \"contactInfo\": \"$EMAIL\"}")

LEAD_ID=$(echo "$RESPONSE" | get_json_value "id")
STATUS=$(echo "$RESPONSE" | get_json_value "status")

echo "Created Lead Response: $RESPONSE"
echo "Lead ID: $LEAD_ID"
echo "Status: $STATUS"

if [ -z "$LEAD_ID" ]; then
    echo "❌ Failed to create lead."
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
CURRENT_STATUS=$(echo "$LEAD_CHECK" | get_json_value "status")

echo "Current Status: $CURRENT_STATUS"
# Simple grep to check for events existence
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
FINAL_STATUS=$(echo "$FINAL_LEAD" | get_json_value "status")

echo "Final Status: $FINAL_STATUS"
echo "Full Lead Data: $FINAL_LEAD"

echo "--------------------------------------------------"
echo "🎉 Verification Complete."
