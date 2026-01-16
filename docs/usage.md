# Usage Guide & API

This guide details how to interact with the Salespad API.

**Base URL:** `http://localhost:3000/api/v1`
**Root Metadata:** `http://localhost:3000/`

## Response Format

All API responses follow a standardized JSON structure:

```json
{
  "correlationId": "3b64f4b2-5d6d-4c41-9dbe-7d2d6cfb6d54",
  "data": { ... }, // The actual resource or result
  "meta": {
    "timestamp": "2026-01-16T12:00:00.000Z"
  }
}
```

In case of success, the result is in `data`. In case of error, the response follows RFC 7807 Problem Details.

---

## Root Endpoint

### Get API Metadata
Retrieves version and environment information.
- **Endpoint:** `GET http://localhost:3000/`
- **Result:**
  ```json
  {
    "data": {
      "name": "Salespad API",
      "version": "1.0.0",
      ...
    },
    "links": { ... }
  }
  ```

---

## Resource: Leads

All lead-related endpoints are versioned under `/api/v1/leads`.

### 1. Create a Lead
Creates a new prospect in the system.
- **Endpoint:** `POST /api/v1/leads`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "contactInfo": "john@example.com"
  }
  ```
- **Result:**
  ```json
  {
    "correlationId": "...",
    "data": {
      "id": "uuid",
      "status": "new",
      ...
    },
    "meta": { ... }
  }
  ```

### 2. Get a Lead
Retrieves lead information, including full event history.
- **Endpoint:** `GET /api/v1/leads/:id`
- **Result:** Complete Lead object with `events` array, wrapped in standard response.

### 3. Send Outbound Message
Sends an email to the lead and updates status.
- **Endpoint:** `POST /api/v1/leads/send`
- **Body:**
  ```json
  {
    "leadId": "lead-uuid",
    "message": "Hello, how are you?"
  }
  ```
- **Result:**
  ```json
  {
    "data": { "status": "queued" }
  }
  ```

### 4. Process Inbound Reply
Registers that the lead has replied.
- **Endpoint:** `POST /api/v1/leads/reply`
- **Body:**
  ```json
  {
    "leadId": "lead-uuid",
    "content": "I am interested, thanks."
  }
  ```
- **Result:** `{ "data": { "status": "processed" } }`

### 5. Generate AI Reply
Triggers AI service to analyze conversation and auto-respond.
- **Endpoint:** `POST /api/v1/leads/ai-reply`
- **Body:**
  ```json
  {
    "leadId": "lead-uuid"
  }
  ```
- **Result:**
  ```json
  {
    "data": {
      "status": "generated",
      "reply": "AI generated response..."
    }
  }
  ```

---

## Postman Collection

A complete Postman collection with detailed examples is included at:
`postman/salespad-postman-collection.json`

You can import it directly into Postman to test all endpoints.
