# Use Node.js LTS
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY frontend/ .

# Build
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY frontend/next.config.js ./

EXPOSE 3000

CMD ["npm", "start"]
