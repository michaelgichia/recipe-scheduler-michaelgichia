# Producer Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy root package.json and package-lock.json
COPY package*.json ./

# Copy shared package
COPY packages/shared ./packages/shared

# Copy api-gateway package
COPY packages/api-gateway ./packages/api-gateway

# Install dependencies
RUN npm install

# Build shared package first
WORKDIR /app/packages/shared
RUN npm run build

# Build api-gateway
WORKDIR /app/packages/api-gateway
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]