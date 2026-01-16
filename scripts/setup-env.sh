#!/bin/bash

# setup-env.sh
# Installs necessary dependencies and sets up the local environment for Salespad.

set -e

echo "🚀 Setting up Salespad environment..."

# 1. Check/Install Bun
echo "🔍 Checking Bun..."
if ! command -v bun &> /dev/null; then
    echo "📦 Bun not found. Installing..."
    curl -fsSL https://bun.sh/install | bash
    
    # Attempt to add to path for current session
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
else
    echo "✅ Bun is already installed: $(bun --version)"
fi

# 2. Check Docker
echo "🔍 Checking Docker..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found!"
    echo "👉 Please install Docker manually: https://docs.docker.com/get-docker/"
    exit 1
else
    echo "✅ Docker is available."
fi

# 3. Setup .env file
echo "configure: Checking configuration..."
if [ ! -f .env ]; then
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
else
    echo "✅ .env file already exists."
fi

# 4. Install Project Dependencies
echo "📦 Installing project dependencies with Bun..."
bun install

# 5. Initialize Husky
echo "🐶 Initializing Husky hooks..."
bun run prepare || echo "⚠️ Husky initialization failed (non-critical)"

# 6. Check Security Tools
echo "🛡️  Checking Security Tools..."

# Semgrep
if ! command -v semgrep &> /dev/null; then
    echo "⚠️  Semgrep not found. It is recommended for security scans."
    echo "👉 Install: 'brew install semgrep' or 'pip install semgrep'"
else
    echo "✅ Semgrep is installed."
fi

# Snyk
if command -v snyk &> /dev/null; then
    echo "✅ Snyk is available."
    # Optional: check auth
    # snyk auth --test &> /dev/null || echo "ℹ️  Run 'snyk auth' to enable detailed scans."
else
    echo "📦 Snyk CLI not found (it might be installed effectively via 'bunx snyk')."
    echo "ℹ️  You can use 'bun run security:snyk' which uses the local dependency."
fi


echo ""
echo "🎉 Environment setup complete!"
echo "To start the project:"
echo "  1. Start databases:  docker-compose up -d"
echo "  2. Start app:        bun run start:dev"
echo ""
