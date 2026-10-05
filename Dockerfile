# Multi-stage production build for VOLTA Vintage Bulbs
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and workspaces
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN cd server && npm install
RUN cd client && npm install

# Copy source files
COPY . .

# Build frontend static bundle
RUN cd client && npm run build

# Production Runner stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY package*.json ./
COPY server/package*.json ./server/

# Install production server dependencies only
RUN cd server && npm install --only=production

# Copy built server and client dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/dist ./client/dist

EXPOSE 5000

CMD ["node", "server/server.js"]
