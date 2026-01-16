# Setup and Installation Guide

## Prerequisites
- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose**
- **Git**

## Environment Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gtelesio/salespad.git
    cd salespad
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Configure Environment Variables:**
    Copy the example file and adjust if necessary.
    ```bash
    cp .env.example .env
    ```
    *Note: By default, the application expects PostgreSQL on port 5432 and Redis on 6379.*

## Run Infrastructure (Database & Redis)

Use Docker Compose to start necessary services:

```bash
docker-compose up -d
```
This will start:
- **PostgreSQL** (Database `salespad`, user `user`, pass `password`)
- **Redis** (For message queues)

## Run the Application

### Development Mode
With hot-reload (watch mode):
```bash
bun run start:dev
```

### Production Mode
Optimized build and execution:
```bash
bun run build
bun run start:prod
```

## Verification

To verify everything is working correctly, you can run the full flow script:

```bash
node scripts/verify-flow.js
```

This simulates lead creation, sending messages, and automated responses.
