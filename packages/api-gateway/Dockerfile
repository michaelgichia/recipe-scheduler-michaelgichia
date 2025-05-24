# Stage 1: Build stage
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files for root and all packages
COPY package*.json ./
COPY packages/shared/package*.json ./packages/shared/
COPY services/api-gateway/package*.json ./services/api-gateway/

# Install all dependencies (including devDependencies for building)
RUN npm install

# Copy source code for shared and api-gateway
COPY packages/shared ./packages/shared
COPY services/api-gateway ./services/api-gateway

# Build shared package
WORKDIR /app/packages/shared
RUN npm run build

# Build API Gateway
WORKDIR /app/services/api-gateway
RUN npm run build

# Stage 2: Production stage
FROM node:24-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nestjs:nodejs /app/packages/shared/package*.json ./packages/shared/
COPY --from=builder --chown=nestjs:nodejs /app/services/api-gateway/package*.json ./services/api-gateway/

# Install production dependencies
RUN npm install --production && npm cache clean --force

# Copy built files
COPY --from=builder --chown=nestjs:nodejs /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder --chown=nestjs:nodejs /app/services/api-gateway/dist ./dist

# Create necessary directories
RUN mkdir -p /app/logs && chown -R nestjs:nodejs /app/logs

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Start the application
CMD ["node", "dist/main"]