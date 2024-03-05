FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .  


RUN npm run build

FROM ghcr.io/aosasona/chimney:latest

COPY --from=build /app/dist /var/www/html

COPY chimney.toml /etc/chimney/chimney.toml

EXPOSE 80

CMD ["run"]
