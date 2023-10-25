FROM ghcr.io/devsoleo/statik:main

WORKDIR /usr/src/app

COPY ./dist ./dist

EXPOSE 3002

CMD [ "npm", "run", "start" ]