FROM nginx:alpine-slim

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/src/app

COPY ./dist /usr/share/nginx/html