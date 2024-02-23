FROM node:19-bullseye

WORKDIR /app

COPY /app/package.json .

RUN yarn install

COPY /app .

EXPOSE 3005

CMD [ "yarn", "start" ]