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
    
3. **Install Security Tools (Optional but Recommended)**
    To run local security scans (`pre-push` hooks), install Semgrep globally:
    ```bash
    # MacOS (Homebrew)
    brew install semgrep

    # Or via pip
    pip install semgrep
    ```
    
    For Snyk integration:
    ```bash
    # Authenticate Snyk locally
    bunx snyk auth
    ```

## Run Application (Full Stack via Docker)

The easiest way to run the entire application (API + DB + Redis) is with Docker Compose.

```bash
docker-compose up --build -d
```

This will start:
- **API Server** on `http://localhost:3000`
- **PostgreSQL** (Database `salespad`)
- **Redis** (For message queues)

## Run Locally (Development)

If you prefer to run the API locally (e.g., for debugging) while keeping DB/Redis in Docker:

1.  **Start Infrastructure Only:**
    *Comment out the `api` service in `docker-compose.yml` temporarily or use a separate compose file.* 
    OR, if you just want to spin up dependencies:
    ```bash
    docker-compose up -d postgres redis
    ```

2.  **Run API:**
    ```bash
    bun run start:dev
    ```

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
