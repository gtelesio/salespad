# Usage Guide & API

This guide details how to interact with the Salespad API endpoints.

## Resource: Leads

### 1. Create a Lead
Creates a new prospect in the system.
- **Endpoint:** `POST /leads`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "contactInfo": "john@example.com"
  }
  ```
- **Result:** Creates lead with `NEW` status and logs `CREATED` event.

### 2. Get a Lead
Retrieves lead information, including full event history.
- **Endpoint:** `GET /leads/:id`
- **Result:** Complete Lead object with `events` array.

### 3. Send Outbound Message
Sends an email to the lead and updates status.
- **Endpoint:** `POST /leads/send`
- **Body:**
  ```json
  {
    "leadId": "lead-uuid",
    "message": "Hello, how are you?"
  }
  ```
- **Result:**
  - Updates status to `CONTACTED`.
  - Logs `OUTBOUND` event.
  - Enqueues job in BullMQ to actually send email (simulated with delay).

### 4. Process Inbound Reply
Registers that the lead has replied.
- **Endpoint:** `POST /leads/reply`
- **Body:**
  ```json
  {
    "leadId": "lead-uuid",
    "content": "I am interested, thanks."
  }
  ```
- **Result:**
  - Updates status to `REPLIED`.
  - Logs `INBOUND` event.

### 5. Generate AI Reply
Triggers AI service to analyze conversation and auto-respond.
- **Endpoint:** `POST /leads/ai-reply`
- **Body:**
  ```json
  {
    "leadId": "lead-uuid"
  }
  ```
- **Result:**
  - Analyzes last message (Mock AI).
  - Generates a response.
  - Logs `SYSTEM_LOG` event.
  - Sends response using Outbound Message flow.

---

## Postman Collection

A complete Postman collection with detailed examples is included at:
`postman/salespad-postman-collection.json`

You can import it directly into Postman to test all endpoints.
