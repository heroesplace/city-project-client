FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install --quiet --omit=dev
RUN npm run build

FROM nginx:alpine-slim

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/src/app/dist .

COPY ./entrypoint.sh /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]