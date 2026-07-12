# Stage 1 — build
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
RUN npm run build

# Stage 2 — serve static files with Caddy
FROM caddy:2-alpine
COPY --from=build /app/dist /usr/share/caddy
EXPOSE 80
