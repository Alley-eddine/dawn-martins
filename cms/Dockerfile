FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV PAYLOAD_SECRET=build-time-secret-not-used-at-runtime!!
ENV DATABASE_URL=postgresql://placeholder:5432/placeholder
RUN pnpm generate:importmap
RUN pnpm build

# Production
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/src ./src
RUN mkdir -p /app/media
EXPOSE 3000
CMD ["pnpm", "start"]
