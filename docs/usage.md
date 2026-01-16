# 📚 Usage Guide & API Reference

This document provides a detailed reference for interacting with the **Salespad API**. It covers all available endpoints, required parameters, validation rules, and response formats.

## 🌍 Base Configuration

*   **Base URL**: `http://localhost:3000/api/v1`
*   **Content-Type**: `application/json` defaults for all POST requests.
*   **Timeouts**: Default request timeout is 30s.

---

## 📦 Standard Response Format

All API responses (success and error) follow a unified structure (envelope) to ensure consistency.

### Success Response
```json
{
  "correlationId": "3b64f4b2-5d6d-4c41-9dbe-7d2d6cfb6d54",
  "data": { ... }, // The requested resource or result object
  "meta": {
    "timestamp": "2026-01-16T12:00:00.000Z"
  }
}
```

### Error Response
Uses standard HTTP status codes (4xx, 5xx) and follows [RFC 7807](https://tools.ietf.org/html/rfc7807) guidelines.
```json
{
  "correlationId": "...",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": ["contactInfo must be an email"]
  }
}
```

---

## 🚀 Endpoints: Leads

Base path: `/leads`

### 1. Create a Lead
Register a new potential client in the system.

- **URL**: `/leads`
- **Method**: `POST`
- **Description**: Creates a lead with status `new`. Enforces unique `contactInfo`.

#### Request Body
| Field | Type | Required | constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `name` | `string` | **Yes** | Not Empty | Full name of the lead. |
| `contactInfo` | `string` | **Yes** | Valid Email | Unique contact identifier (email or phone). |

#### Example Request
```json
{
  "name": "Jane Doe",
  "contactInfo": "jane.doe@example.com"
}
```

#### Success Response (201 Created)
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Jane Doe",
    "contactInfo": "jane.doe@example.com",
    "status": "new",
    "createdAt": "2026-01-16T10:00:00Z"
  }
}
```

---

### 2. Get Lead Details
Retrieve a specific lead and their full interaction history.

- **URL**: `/leads/:id`
- **Method**: `GET`
- **Params**:
    - `id` (UUID): The unique identifier of the lead.

#### Success Response (200 OK)
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Jane Doe",
    "status": "contacted",
    "events": [
      {
        "id": "evt-123",
        "type": "created",
        "timestamp": "..."
      }
    ]
  }
}
```

#### Error Response (404 Not Found)
When the provided ID does not exist.

---

### 3. Send Outbound Message
Send a message (e.g., Email/WhatsApp) to a lead. This action is **asynchronous** and queued.

- **URL**: `/leads/send`
- **Method**: `POST`
- **Status Change**: Transitions lead status to `contacted`.

#### Request Body
| Field | Type | Required | constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `leadId` | `string` | **Yes** | Valid UUID | ID of the target lead. |
| `message` | `string` | **Yes** | Not Empty | Content of the message to send. |

#### Example Request
```json
{
  "leadId": "123e4567-e89b-12d3-a456-426614174000",
  "message": "Hi Jane, checking in on your interest."
}
```

#### Success Response (201 Created)
```json
{
  "data": {
    "status": "queued"
  }
}
```
*Note: The actual sending happens in the background via the generic-queue.*

---

### 4. Process Inbound Reply
Record a reply received from a lead (e.g., via webhook callback).

- **URL**: `/leads/reply`
- **Method**: `POST`
- **Status Change**: Transitions lead status to `replied`.

#### Request Body
| Field | Type | Required | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `leadId` | `string` | **Yes** | Valid UUID | ID of the lead replying. |
| `content` | `string` | **Yes** | Not Empty | The text content of the reply. |

#### Example Request
```json
{
  "leadId": "123e4567-e89b-12d3-a456-426614174000",
  "content": "Yes, I would like to schedule a demo."
}
```

#### Success Response (201 Created)
```json
{
  "data": {
    "status": "processed"
  }
}
```

---

### 5. Generate AI Reply
Triggers the AI agent to analyze the conversation history and generate a suggested response.

- **URL**: `/leads/ai-reply`
- **Method**: `POST`
- **Prerequisite**: Requires an active OpenAI API Key configured in the backend.

#### Request Body
| Field | Type | Required | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `leadId` | `string` | **Yes** | Valid UUID | ID of the lead to generate a reply for. |

#### Example Request
```json
{
  "leadId": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Success Response (201 Created)
```json
{
  "data": {
    "status": "generated",
    "reply": "Thank you for your interest! We have availability..."
  }
}
```

---

## 🛠 Testing with Postman
A pre-configured Postman collection is available in the repository at:
`postman/salespad-postman-collection.json`

Import this file into Postman to instantly access all endpoints with preset environment variables.
