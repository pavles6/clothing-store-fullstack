FROM node:22-alpine3.20

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

WORKDIR /app

CMD npx prisma db push && npx prisma db seed && npm run dev
