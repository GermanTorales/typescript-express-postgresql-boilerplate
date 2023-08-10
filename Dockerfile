# Use NodeJS version 18 alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose application
EXPOSE 3636

# Run the app
CMD ["node", "./src/www/index.ts"]
