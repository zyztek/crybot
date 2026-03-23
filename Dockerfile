# CryptoFaucet Frontend - Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build with API URL for Docker networking
ARG VITE_API_URL=http://backend:3000/api
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# Production nginx image
FROM nginx:alpine

# Copy built single-file HTML
COPY --from=builder /app/dist/index.html /usr/share/nginx/html/

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]