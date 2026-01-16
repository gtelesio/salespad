# 🚀 SalesPad API

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

**SalesPad** is a robust backend system designed for high-performance Lead and Queue management. Built with **NestJS**, it strictly adheres to **Domain-Driven Design (DDD)** and **Clean Architecture** principles to ensure scalability, maintainability, and reliability.

This project implements an MVP supporting the full lead lifecycle, from creation to automated AI interactions, utilizing a resilient asynchronous messaging architecture.

---

## ✨ Key Features

*   **Modular Monolith Architecture**: Strict separation of concerns (Domain, Application, Infrastructure) using DDD.
*   **Reliable Async Processing**: Uses **BullMQ** and **Redis** to ensure no messages are lost, with automatic retries and failure handling.
*   **Dual-Storage Strategy**: **PostgreSQL** (TypeORM) for ACID compliance and **Redis** for ephemeral job data and caching.
*   **AI Integration**: Built-in architecture for AI-powered automated responses.
*   **Code Quality**: Enforced via **Biome** and strict typing.
*   **DevOps Ready**: Includes Docker Compose setup and E2E verification scripts.

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

*   **[🛠 Setup & Installation](docs/setup.md)**: Guide to getting the environment up and running.
*   **[🏗 System Architecture](docs/architecture.md)**: Deep dive into the DDD structure, data flow, and system diagrams.
*   **[🧪 Testing Strategy](docs/testing.md)**: Details on Unit Tests, Coverage, and Husky Hooks.
*   **[🚀 CI/CD Pipeline](docs/ci-cd.md)**: GitHub Actions workflow and build verification.
*   **[📚 API Usage](docs/usage.md)**: Reference for endpoints and usage examples.

---

## ⚡ Quick Start

### Prerequisites
*   Docker & Docker Compose
*   Node.js (or Bun)

### Installation

```bash
# 1. Automated Setup (Recommended)
./scripts/setup-env.sh

# 2. Start Infrastructure (DB + Redis)
docker-compose up -d

# 3. Run the Application
bun run start:dev
```

### verification

Run the included end-to-end flow verification script:

```bash
./scripts/verify-flow.sh
```



## 👨‍💻 Author

Developed by **Gonzalo Patricio Telesio**.
[LinkedIn Profile](https://www.linkedin.com/in/gonzalo-telesio-658791173/)

---

## 📄 License

This project is private and proprietary.
