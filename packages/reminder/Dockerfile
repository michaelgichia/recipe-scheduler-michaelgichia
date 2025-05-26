# Subscriber Dockerfile
FROM node:24-alpine

WORKDIR /app

# Copy root package.json and package-lock.json
COPY package*.json ./

# Copy shared package
COPY packages/shared ./packages/shared

# Copy reminder package
COPY packages/reminder ./packages/reminder

# Install dependencies
RUN npm install

# Build shared package first
WORKDIR /app/packages/shared
RUN npm run build

# Build reminder
WORKDIR /app/packages/reminder
RUN npm run build

# Create data directory for SQLite
RUN mkdir -p /app/packages/reminder/data

EXPOSE 3005

CMD ["npm", "run", "start:prod"]