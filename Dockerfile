FROM oven/bun:1-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Rebuild the source code
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production image
FROM base AS runner
ENV NODE_ENV production

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
# chown is needed because we are copying to a directory owned by root and then switching user
RUN chown -R nestjs:nodejs /app

USER nestjs

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json

EXPOSE 3000

# We use 'node' to run the app as defined in package.json start:prod, 
# BUT since we are in bun image, we can just run it with bun equivalent or node if available.
# oven/bun image does NOT include node by default. 
# We should run the built file directly with bun.
CMD ["bun", "dist/main.js"]
