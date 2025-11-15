# Use the official Bun image which includes the bun runtime
FROM oven/bun:1.3-alpine AS base


FROM base AS install 

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json bun.lock* ./

# Install dependencies (production only)
RUN bun install --frozen-lockfile --production

FROM base AS build

WORKDIR /app

COPY --from=install /app/node_modules ./node_modules
COPY . .
 
RUN addgroup -g 10001 appgroup && \
    adduser -u 10001 -D -G appgroup appuser

RUN chown -R appuser:appgroup /app

USER appuser

# Expose the port the app listens on
EXPOSE 8080

# Start the application
CMD ["bun", "dev"]
