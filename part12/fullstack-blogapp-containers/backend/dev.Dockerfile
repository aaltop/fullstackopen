FROM node:20

WORKDIR /home/node/app/

COPY --chown=node:node . .

RUN npm install

USER node

CMD [ "npm", "run", "wsl:dev" ]