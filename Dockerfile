# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# 1. deps — install node_modules once, reuse in the dev and build stages.
#    Copying only the manifests first means this layer is cached until
#    package.json / package-lock.json actually change.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci


# ---------------------------------------------------------------------------
# 2. dev — Astro dev server with hot reload. Used by the `dev` compose service,
#    which bind-mounts the source over /app.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
# Bind-mounted files don't emit fs events on Windows/macOS hosts, so
# astro.config.mjs switches Vite to polling when this is set.
ENV DOCKER_DEV=true
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# ---------------------------------------------------------------------------
# 3. build — produce the static site in /app/dist.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


# ---------------------------------------------------------------------------
# 4. prod — serve the built HTML with nginx. No Node in the final image;
#    it's just nginx plus the static files (~93MB).
# ---------------------------------------------------------------------------
FROM nginx:1.29-alpine AS prod
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
# Explicitly 127.0.0.1, not localhost: nginx listens on IPv4 only, while
# `localhost` resolves to ::1 first inside the container and is refused.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
