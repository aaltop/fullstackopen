FROM node:20 AS test_and_build

WORKDIR /home/node/app/

ENV VITE_BACKEND_URL=http://localhost:8080/

COPY --chown=node:node . .

RUN npm install

RUN npm run test

ENV NODE_ENV=production

RUN npm run build

FROM nginx:1.27.3-alpine

COPY --from=test_and_build /home/node/app/dist/ /usr/share/nginx/html