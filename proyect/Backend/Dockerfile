FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src /app/src

EXPOSE 3000

CMD ["node", "src/index.js"]