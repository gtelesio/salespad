# 🧪 Testing Strategy

This project enforces high quality standards through automated pipelines and strict testing protocols.

## Unit Testing
*   **Framework**: [Jest](https://jestjs.io/)
*   **Scope**: All Use Cases, Services, and Controllers are tested in isolation.
*   **Runtime**: Tests run using the **Bun** runtime for performance.
*   **Coverage**: A minimum of **20% coverage** is enforced globally (Statements, Branches, Functions, Lines).

### Running Tests
```bash
# Run unit tests
bun run test

# Run tests with coverage report
bun run test:cov
```

## Local Quality Gate (Husky)
We use [Husky](https://typicode.github.io/husky/) to prevent bad code from entering the repository.

### Pre-commit Hook
Runs automatically before every commit:
1.  **Lint & Format**: `bunx biome ci ./src`
2.  **Tests**: `bun run test:cov` (Fails if coverage < 20%)

### Commit-msg Hook
Enforces **Conventional Commits** standard using `commitlint`.
*   **Format**: `<type>: <description>`
*   **Examples**:
    *   `feat: add new lead`
    *   `fix: resolve circular dependency`
    *   `docs: update README`

## Security Scanning (SAST)
We integrate static analysis tools to detect vulnerabilities early in the development lifecycle.

### 🔍 Semgrep
**Semgrep** (Static Analysis for Security Code) scans your code for security patterns and bad practices.

*   **Installation**: `brew install semgrep` (Global)
*   **Run Locally**: `bun run security:semgrep`
*   **Pipeline**: Runs on `pre-push` (if installed) and in CI/CD.
*   **Rules**: Uses the default "auto" config, which includes OWASP Top 10 and security best practices for TypeScript/NestJS.

### 🐶 Snyk Code
**Snyk Code** provides deep static analysis to find security flaws in your code.

*   **Authentication**: Run `bunx snyk auth` to link your local environment.
*   **Run Locally**: `bun run security:snyk`
*   **Pipeline**: Runs on `pre-push` (if authenticated) and in CI/CD (requires `SNYK_TOKEN`).
*   **Scope**: Checks for vulnerabilities like SQL Injection, XSS, Hardcoded Secrets, etc.

