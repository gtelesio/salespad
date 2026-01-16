# 🚀 CI/CD Pipeline

This project uses **GitHub Actions** for Continuous Integration to ensure the main branch remains stable and deployable.

## Workflow: `ci.yml`
The pipeline triggers automatically on every push to the `main` branch and on Pull Requests targeting `main`.

### Pipeline Steps
1.  **Checkout & Setup**
    *   Uses `actions/checkout`.
    *   Sets up the environment with **Bun** (`oven-sh/setup-bun`).

2.  **Dependencies**
    *   Runs `bun install` to install project dependencies.

3.  **Linting & Quality**
    *   Runs `bunx biome ci ./src` to validate code style and logical errors using Biome.

4.  **Testing**
    *   Runs `bun run test:cov` to execute all unit tests and verify coverage meets the 20% threshold.

5.  **Security Scans**
    *   **Semgrep**: Scans source code using `auto` config. Installs via `pip` in CI environment.
    *   **Snyk Code**: Deep static analysis. Runs only if `SNYK_TOKEN` repository secret is present.

6.  **Build Verification**
    *   Runs `bun run build` (via Nest CLI) to compile the application and ensure there are no build errors.

## Configuration
The full workflow configuration can be found at: `.github/workflows/ci.yml`.
