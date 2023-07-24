ARG NODE_VERSION=18.16.0

FROM node:${NODE_VERSION} as build

ARG PORT=5000

EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i && npm prune --production 

COPY . .

FROM node:${NODE_VERSION}-alpine as production

WORKDIR /app

COPY --from=build /app/ .

CMD ["npm", "run", "prod"]