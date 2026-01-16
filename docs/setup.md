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

2.  **Run Setup Script (Recommended):**
    This script will install Bun, check Docker, and setup `.env` automatically.
    ```bash
    ./scripts/setup-env.sh
    ```

    *Alternatively, you can manually install dependencies with `bun install` and configure `.env`.*

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
./scripts/verify-flow.sh
```

This simulates lead creation, sending messages, and automated responses.
