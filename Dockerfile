# Stage 1 — build the static export
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 — serve static files with Caddy
FROM caddy:2-alpine
COPY --from=build /app/out /usr/share/caddy
EXPOSE 80
