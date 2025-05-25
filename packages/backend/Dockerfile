# Subscriber Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy root package.json and package-lock.json
COPY package*.json ./

# Copy shared package
COPY packages/shared ./packages/shared

# Copy backend package
COPY packages/backend ./packages/backend

# Install dependencies
RUN npm install

# Build shared package first
WORKDIR /app/packages/shared
RUN npm run build

# Build backend
WORKDIR /app/packages/backend
RUN npm run build

# Create data directory for SQLite
RUN mkdir -p /app/packages/backend/data

EXPOSE 3001

CMD ["npm", "run", "start:prod"]