FROM node:23-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install --include=dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
