# Use the official Bun image which includes the bun runtime
FROM oven/bun:latest

# Create app directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json bun.lock* ./

# Install dependencies (production only)
RUN bun install --production

# Copy the rest of the application
COPY . .

# Expose the port the app listens on
EXPOSE 8080

# Start the application
CMD ["bun", "server.ts"]
