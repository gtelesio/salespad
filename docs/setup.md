# Guía de Instalación y Configuración

## Prerrequisitos
- **Node.js** (v18 o superior)
- **Docker** y **Docker Compose**
- **Git**

## Configuración del Entorno

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/gtelesio/salespad.git
    cd salespad
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configurar Variables de Entorno:**
    Copia el archivo de ejemplo y ajústalo si es necesario.
    ```bash
    cp .env.example .env
    ```
    *Nota: Por defecto, la aplicación espera que PostgreSQL corra en el puerto 5432 y Redis en el 6379.*

## Ejecutar Infraestructura (Base de Datos y Redis)

Utiliza Docker Compose para levantar los servicios necesarios:

```bash
docker-compose up -d
```
Esto iniciará:
- **PostgreSQL** (Base de datos `salespad`, usuario `user`, pass `password`)
- **Redis** (Para colas de mensajes)

## Ejecutar la Aplicación

### Modo Desarrollo
Con recarga automática (watch mode):
```bash
npm run start:dev
```

### Modo Producción
Compilación y ejecución optimizada:
```bash
npm run build
npm run start:prod
```

## Verificación

Para verificar que todo funcione correctamente, puedes ejecutar el script de flujo completo:

```bash
node scripts/verify-flow.js
```

Esto simulará la creación de un lead, envío de mensajes y respuestas automáticas.
