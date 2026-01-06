FROM node:latest

WORKDIR /app

COPY package*.json ./


RUN npm install
RUN npm i --save-dev @types/cors

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]