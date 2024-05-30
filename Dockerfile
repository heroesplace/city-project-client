FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build
RUN npm install --quiet --omit=dev

EXPOSE 3002

ENTRYPOINT ["npm", "start"]