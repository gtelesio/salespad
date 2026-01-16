# Salespad API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Sistema backend de gestión de Leads y Colas, construido con **NestJS**, siguiendo estrictamente **Domain-Driven Design (DDD)** y **Clean Architecture**.

Este proyecto implementa un MVP que soporta el ciclo de vida completo de un lead, desde su creación hasta la interacción automatizada por IA, utilizando procesamiento asíncrono robusto.

## 📚 Documentación

La documentación detallada del proyecto se encuentra organizada en la carpeta `docs/`.

### Índices de Documentación

- **[🛠 Guía de Instalación y Configuración](docs/setup.md)**
  Pasos para levantar el entorno local, base de datos, Redis y ejecutar la aplicación.

- **[🏗 Arquitectura del Proyecto](docs/architecture.md)**
  Explicación detallada de la estructura DDD (Dominio, Aplicación, Infraestructura), decisiones de diseño y flujo de datos.

- **[🚀 Guía de Uso y API](docs/usage.md)**
  Referencia de los endpoints disponibles, ejemplos de uso y flujos soportados.

---

## Características Principales

- **Arquitectura Limpia:** Separación estricta de responsabilidades.
- **Base de Datos:** PostgreSQL con TypeORM.
- **Colas Asíncronas:** BullMQ y Redis para envío de mensajes con reintentos.
- **Simulación de IA:** Servicio integrado para respuestas automáticas.
- **Code Quality:** Uso de `Biome` para linting y formatting, Alias de rutas (`@/`).
- **Tooling:** Scripts de verificación E2E y Colección de Postman incluida.

## Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar servicios (Docker)
docker-compose up -d

# 3. Iniciar aplicación
npm run start:dev
```

Para más detalles, consulta la [Guía de Instalación](docs/setup.md).

