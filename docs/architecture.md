# Arquitectura del Proyecto

## Visión General
Salespad es un sistema backend construido con NestJS siguiendo los principios de **Domain-Driven Design (DDD)** y **Clean Architecture**. El objetivo es mantener un código desacoplado, testable y escalable, donde la lógica de negocio esté aislada de los detalles de infraestructura.

## Estructura de Directorios

El código fuente se encuentra en `src/` y se organiza por módulos semánticos (`leads`, `common`).

```
src/
├── leads/                  # Módulo de Leads (Core)
│   ├── domain/             # Capa de Dominio (Entidades, Interfaces de Repositorio)
│   ├── application/        # Capa de Aplicación (Casos de Uso, DTOs, Servicios)
│   ├── infrastructure/     # Capa de Infraestructura (Persistencia, Colas, Adaptadores)
│   └── presentation/       # Capa de Presentación (Controladores HTTP, DTOs de Entrada)
├── common/                 # Código compartido (Decoradores, Utilidades)
├── scripts/                # Scripts de utilidad
└── ...
```

## Capas de la Arquitectura

### 1. Dominio (`domain/`)
Es el corazón de la aplicación. Contiene las reglas de negocio puras y no depende de ninguna otra capa.
- **Entidades:** Objetos con identidad y ciclo de vida (`Lead`, `Event`).
- **Interfaces de Repositorio:** Contratos que definen cómo se accede a los datos (`LeadRepository`), implementados en infraestructura.

### 2. Aplicación (`application/`)
Orquesta el flujo de datos entre el dominio y el mundo exterior.
- **Casos de Uso:** Ejecutan acciones específicas del negocio (ej. `CreateLeadUseCase`, `SendOutboundMessageUseCase`).
- **DTOs:** Objetos de transferencia de datos internos.
- **Servicios:** Lógica que no pertenece a una entidad específica o interactúa con sistemas externos (`AiMockService`).

### 3. Infraestructura (`infrastructure/`)
Implementa los detalles técnicos y adaptadores.
- **Persistencia:** Implementación de repositorios con TypeORM (`TypeOrmLeadRepository`).
- **Colas:** Procesadores de trabajos en segundo plano (`EmailProcessor` con BullMQ).
- **Configuración:** Módulos de configuración de base de datos y redis.

### 4. Presentación (`presentation/`)
Maneja la entrada y salida HTTP.
- **Controladores:** Reciben peticiones y delegan a los casos de uso (`LeadsController`).
- **DTOs:** Definen la estructura de los datos recibidos por la API.

## Flujo de Datos

1. **Request HTTP** llega a `LeadsController`.
2. El controlador valida el DTO y llama al **Caso de Uso** correspondiente.
3. El Caso de Uso interactúa con las **Entidades de Dominio** y el **Repositorio**.
4. Si es necesario, se emiten eventos o se encolan trabajos (ej. enviar email).
5. El Repositorio persiste los cambios en **Base de Datos**.
6. Se retorna una respuesta al cliente.

## Tecnologías Clave
- **NestJS:** Framework principal.
- **PostgreSQL:** Base de datos relacional.
- **TypeORM:** ORM para persistencia.
- **BullMQ / Redis:** Gestión de colas asíncronas.
- **Biome:** Linter y Formatter.
