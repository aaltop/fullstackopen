FROM node:20-alpine

WORKDIR /home/node/app/

ENV NODE_ENV=production

COPY --chown=node:node . .

RUN rm playwright.config.js

RUN npm ci

USER node

CMD [ "npm", "run", "start" ]