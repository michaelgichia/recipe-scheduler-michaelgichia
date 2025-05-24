# Subscriber Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy root package.json and package-lock.json
COPY package*.json ./

# Copy shared package
COPY packages/shared ./packages/shared

# Copy events-service package
COPY packages/events-service ./packages/events-service

# Install dependencies
RUN npm install

# Build shared package first
WORKDIR /app/packages/shared
RUN npm run build

# Build events-service
WORKDIR /app/packages/events-service
RUN npm run build

# Create data directory for SQLite
RUN mkdir -p /app/packages/events-service/data

EXPOSE 3001

CMD ["npm", "run", "start:prod"]