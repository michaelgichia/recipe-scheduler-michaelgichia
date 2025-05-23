# Use a base Node.js image
FROM node:24-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the rest of the files
COPY . .

# Install dependencies
RUN npm install

# Command to run the application
CMD ["node", "dist/main"]