# Salespad API



Backend system for Leads and Queues management, built with **NestJS**, strictly following **Domain-Driven Design (DDD)** and **Clean Architecture**.

This project implements an MVP supporting the full lead lifecycle, from creation to automated AI interaction, using robust asynchronous processing.

## 📚 Documentation

Detailed project documentation is organized in the `docs/` folder.

### Documentation Index

- **[🛠 Setup and Installation Guide](docs/setup.md)**
  Steps to set up local environment, database, Redis, and run the application.

- **[🏗 Project Architecture](docs/architecture.md)**
  Detailed explanation of DDD structure (Domain, Application, Infrastructure), design decisions, and data flow.

- **[🚀 Usage Guide & API](docs/usage.md)**
  Reference for available endpoints, usage examples, and supported flows.

---

## Key Features

- **Clean Architecture:** Strict separation of concerns.
- **Database:** PostgreSQL with TypeORM.
- **Async Queues:** BullMQ and Redis for message sending with retries.
- **AI Simulation:** Integrated service for automated responses.
- **Code Quality:** `Biome` for linting/formatting, Path Aliases (`@/`).
- **Tooling:** E2E verification script and Postman Collection included.

## Quick Start

```bash
# 1. Automatic Setup (Recommended)
./scripts/setup-env.sh

# 2. Start services (Docker)
docker-compose up -d

# 3. Start application
bun run start:dev
```

## Verification Service

```bash
./scripts/verify-flow.sh
```

For more details, check the [Setup Guide](docs/setup.md).
