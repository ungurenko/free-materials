FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:2-alpine AS runner

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/out /srv

EXPOSE 3000
