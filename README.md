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
*   **[🏗 System Architecture](docs/architecture.md)**: Deep dive into the DDD structure, data flow, queue reliability strategies, and system diagrams.
*   **[🚀 API Usage](docs/usage.md)**: Reference for endpoints and usage examples.

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

---

## 🧪 Testing & CI/CD

This project enforces high quality standards through automated pipelines and strict testing protocols.

### 1. Testing Strategy
*   **Unit Tests**: Implemented using **Jest**. All Use Cases and key components are tested in isolation.
*   **Coverage**: A minimum of **20% coverage** is enforced globally (Statements, Branches, Functions, Lines).
*   **Runtime**: Tests run using the **Bun** runtime for performance.

```bash
# Run tests with coverage
bun run test:cov
```

### 2. Local Quality Gate (Husky)
We use **Husky** to prevent bad code from entering the repository.

*   **Pre-commit Hook**: Runs automatically before every commit.
    *   **Lint & Format**: `bunx biome ci ./src`
    *   **Tests**: `bun run test:cov` (Fails if coverage < 20%)
*   **Commit-msg Hook**: Enforces **Conventional Commits** standard.
    *   Format: `<type>: <description>` (e.g., `feat: add new lead`, `fix: resolve circular dependency`)

### 3. Continuous Integration (GitHub Actions)
A CI pipeline runs on every push to the `main` branch.

**Workflow Steps:**
1.  **Checkout & Setup**: Sets up the environment with **Bun**.
2.  **Linting**: Validates code style and formatting with **Biome**.
3.  **Testing**: Executes full test suite with coverage requirements.
4.  **Build Verification**: Compiles the application (`bun run build`) to ensure deployability.

View the pipeline configuration at `.github/workflows/ci.yml`.

---

## 👨‍💻 Author

Developed by **Gonzalo Patricio Telesio**.
[LinkedIn Profile](https://www.linkedin.com/in/gonzalo-telesio-658791173/)

---

## 📄 License

This project is private and proprietary.
