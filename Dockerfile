# Root Dockerfile for development
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install root dependencies
RUN npm install

# Copy all packages
COPY packages/ ./packages/

# Install all package dependencies
RUN npm install --workspaces

# Build shared package
WORKDIR /app/packages/shared
RUN npm run build

# Return to root
WORKDIR /app

# Default command
CMD ["npm", "run", "dev"]