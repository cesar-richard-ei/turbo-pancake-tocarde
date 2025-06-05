# Stage 1: Builder
FROM node:lts-alpine AS builder
LABEL org.opencontainers.image.authors="Cesar Richard <cesar@crichard.fr>"

# Mode production
ENV NODE_ENV=production

WORKDIR /app
RUN corepack enable && yarn set version stable
RUN apk add --no-cache git python3 make g++ curl

# Copier les fichiers de dépendances
COPY frontend/package.json frontend/yarn.lock frontend/.yarnrc.yml ./

# Installer les dépendances
RUN yarn install --frozen-lockfile --network-timeout 600000

# Copier le reste des fichiers source
COPY frontend/ ./

# Build pour la production
RUN yarn build

CMD ["yarn", "start"]

# Stage 2: Serveur Nginx
FROM nginx:alpine
LABEL org.opencontainers.image.authors="Cesar Richard <cesar@crichard.fr>"
LABEL org.opencontainers.image.source="https://github.com/cesar-richard-ei/turbo-pancake-tocarde"

# Créer les répertoires nécessaires avec les bonnes permissions
RUN mkdir -p /var/cache/nginx/client_temp \
    /var/cache/nginx/proxy_temp \
    /var/cache/nginx/fastcgi_temp \
    /var/cache/nginx/uwsgi_temp \
    /var/cache/nginx/scgi_temp \
    /tmp/client_body \
    /tmp/proxy_temp \
    /tmp/fastcgi_temp \
    /tmp/uwsgi_temp \
    /tmp/scgi_temp \
    /run/nginx && \
    chmod -R 777 /var/cache/nginx /tmp /run/nginx && \
    touch /run/nginx/nginx.pid && \
    chmod 777 /run/nginx/nginx.pid

# Copier la config Nginx principale avec le chemin du pid personnalisé
COPY nginx/nginx-main.conf /etc/nginx/nginx.conf

# Copier la config Nginx spécifique au serveur
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers du build depuis le stage builder
COPY --from=builder /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
