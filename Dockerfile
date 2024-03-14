FROM node:lts

COPY . /app

WORKDIR /app
RUN npm i

ENTRYPOINT ["npm", "run", "start"]
