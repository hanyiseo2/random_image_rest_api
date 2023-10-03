# BUILD
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# RUNNING SERVER
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --from=build /app/dist ./

EXPOSE 8080

CMD ["npm", "run", "server"]