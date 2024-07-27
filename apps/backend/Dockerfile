FROM node:20.15-slim AS build

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./turbo.json ./

RUN apk --no-cache add --virtual python

RUN corepack enable && corepack prepare pnpm@8.6.9 --activate

ENV PNPM_HOME=/usr/local/bin

RUN pnpm add -g turbo
RUN pnpm add -g pm2

COPY ./packages ./packages
COPY ./apps/* ./apps/

RUN turbo prune --scope=web --docker

RUN pnpm install --frozen-lockfile
RUN turbo build

EXPOSE 3005

CMD if [ "$NODE_ENV" = "production" ]; then \
  pnpm run-migrations && \
  cd apps/backend && \
  pnpm start; \
  else \
  turbo build && \
  turbo dev \
  fi
