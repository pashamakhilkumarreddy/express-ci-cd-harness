ARG NODE_VERSION=18.16.0

FROM node:${NODE_VERSION} as build

ARG PORT=5000

EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY . .

RUN npm ci --unsafe-perm --omit=optional && npm prune --production 

FROM node:${NODE_VERSION}-alpine as production

WORKDIR /app

COPY --from=build /usr/src/app/ .

CMD ["npm", "run", "prod"]