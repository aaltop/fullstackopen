FROM node:20

WORKDIR /home/node/app/

# set here so the chmod works below
RUN chown node:node .

# needed due to vite making some extra file in the top level directory?
RUN chmod g+s .

COPY --chown=node:node . .

RUN npm install

# ... and vite again requires the creation of some cache directory, .vite?
RUN chown node:node ./node_modules/

USER node

CMD [ "npm", "run", "dev", "--", "--host" ]