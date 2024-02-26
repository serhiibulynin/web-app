# Этап 1: Установка зависимостей
FROM node:18.15.0-alpine3.17 as dependencies

ARG IMAGE_LABEL
LABEL stage="${IMAGE_LABEL}-dependencies"

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci 

# Этап 2: Сборка приложения
FROM node:18.15.0-alpine3.17 as builder

ARG IMAGE_LABEL
LABEL stage="${IMAGE_LABEL}-builder"

ENV NODE_ENV=production

WORKDIR /app
COPY ./ ./
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM nginx:1.21.0-alpine
ARG IMAGE_LABEL
ARG BUILD_VERSION

LABEL image-label=$IMAGE_LABEL
LABEL image-version=$BUILD_VERSION

# Copy the ngnix.conf to the container
WORKDIR /usr/share/nginx/html
EXPOSE 80

COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]