FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Dev stage - install deps and run dev server
FROM base AS dev
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
EXPOSE 3002
CMD ["pnpm", "dev"]

# Production build
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.mjs ./
EXPOSE 3002
CMD ["pnpm", "start"]
