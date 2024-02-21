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
COPY --from=dependencies /app/node_modules ./node_modules

COPY ./ ./
RUN npm run build

# Этап 3: Финальный этап
FROM node:18.15.0-alpine3.17

ARG IMAGE_LABEL
ARG BUILD_VERSION

WORKDIR /app

COPY --from=builder /app/build ./
COPY --from=builder /app/.env ./app

LABEL image-label=$IMAGE_LABEL
LABEL image-version=$BUILD_VERSION