FROM node:22-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npx prisma generate

EXPOSE 4466

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]