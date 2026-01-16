# Project Architecture

## Overview
Salespad is a backend system built with NestJS following **Domain-Driven Design (DDD)** and **Clean Architecture** principles. The goal is to maintain decoupled, testable, and scalable code, where business logic is isolated from infrastructure details.

## Directory Structure

Source code is located in `src/` and organized by semantic modules (`leads`, `common`).

```
src/
├── leads/                  # Leads Module (Core)
│   ├── domain/             # Domain Layer (Entities, Repository Interfaces)
│   ├── application/        # Application Layer (Use Cases, DTOs, Services)
│   ├── infrastructure/     # Infrastructure Layer (Persistence, Queues, Adapters)
│   └── presentation/       # Presentation Layer (HTTP Controllers, Input DTOs)
├── common/                 # Shared Code (Decorators, Utilities)
├── scripts/                # Utility Scripts
└── ...
```

## Architecture Layers

### 1. Domain (`domain/`)
The core of the application. Contains pure business rules and depends on no other layer.
- **Entities:** Objects with identity and lifecycle (`Lead`, `Event`).
- **Repository Interfaces:** Contracts defining data access (`LeadRepository`), implemented in infrastructure.

### 2. Application (`application/`)
Orchestrates data flow between the domain and the outside world.
- **Use Cases:** Execute specific business actions (e.g., `CreateLeadUseCase`, `SendOutboundMessageUseCase`).
- **DTOs:** Internal Data Transfer Objects.
- **Services:** Logic that doesn't belong to a specific entity or interacts with external systems (`AiMockService`).

### 3. Infrastructure (`infrastructure/`)
Implements technical details and adapters.
- **Persistence:** Repository implementations using TypeORM (`TypeOrmLeadRepository`).
- **Queues:** Background job processors (`EmailProcessor` with BullMQ).
- **Configuration:** Database and Redis configuration modules.

### 4. Presentation (`presentation/`)
Handles HTTP input and output.
- **Controllers:** Receive requests and delegate to Use Cases (`LeadsController`).
- **DTOs:** Define the structure of data received by the API.

## Data Flow

1. **HTTP Request** hits `LeadsController`.
2. Controller validates DTO and calls the corresponding **Use Case**.
3. Use Case interacts with **Domain Entities** and **Repository**.
4. If needed, events are emitted or jobs enqueued (e.g., send email).
5. Repository persists changes to **Database**.
6. Response is returned to the client.

## Key Technologies
- **NestJS:** Main framework.
- **PostgreSQL:** Relational database.
- **TypeORM:** Persistence ORM.
- **BullMQ / Redis:** Asynchronous queue management.
- **Biome:** Linter and Formatter.
