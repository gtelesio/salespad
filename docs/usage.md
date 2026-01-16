# Guía de Uso y API

Esta guía detalla cómo interactuar con los endpoints de la API de Salespad.

## Recurso: Leads

### 1. Crear un Lead
Crea un nuevo prospecto en el sistema.
- **Endpoint:** `POST /leads`
- **Body:**
  ```json
  {
    "name": "Juan Perez",
    "contactInfo": "juan@example.com"
  }
  ```
- **Resultado:** Crea el lead con estado `NEW` y registra el evento `CREATED`.

### 2. Obtener un Lead
Recupera la información de un lead, incluyendo su historial de eventos.
- **Endpoint:** `GET /leads/:id`
- **Resultado:** Objeto Lead completo con array de `events`.

### 3. Enviar Mensaje Saliente (Outbound)
Envía un email al lead y actualiza su estado.
- **Endpoint:** `POST /leads/send`
- **Body:**
  ```json
  {
    "leadId": "uuid-del-lead",
    "message": "Hola, ¿cómo estás?"
  }
  ```
- **Resultado:**
  - Cambia estado a `CONTACTED`.
  - Registra evento `OUTBOUND`.
  - Encola un trabajo en BullMQ para enviar el email realmente (simulado con delay).

### 4. Procesar Respuesta Entrante (Inbound)
Registra que el lead ha respondido.
- **Endpoint:** `POST /leads/reply`
- **Body:**
  ```json
  {
    "leadId": "uuid-del-lead",
    "content": "Estoy interesado, gracias."
  }
  ```
- **Resultado:**
  - Cambia estado a `REPLIED`.
  - Registra evento `INBOUND`.

### 5. Generar Respuesta con IA
Utiliza el servicio de IA para analizar la conversación y responder automáticamente.
- **Endpoint:** `POST /leads/ai-reply`
- **Body:**
  ```json
  {
    "leadId": "uuid-del-lead"
  }
  ```
- **Resultado:**
  - Analiza el último mensaje (Mock AI).
  - Genera una respuesta.
  - Registra evento `SYSTEM_LOG`.
  - Envía la respuesta usando el flujo de Outbound Message.

---

## Colección de Postman

Se incluye una colección completa de Postman con ejemplos detallados en:
`postman/salespad-postman-collection.json`

Puedes importarla directamente en Postman para probar todos los endpoints.
