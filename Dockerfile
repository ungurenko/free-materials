FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:2-alpine

WORKDIR /app

COPY Caddyfile ./Caddyfile
RUN caddy fmt Caddyfile --overwrite \
    && caddy validate --config Caddyfile --adapter caddyfile

COPY --from=build /app/out ./out

CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
