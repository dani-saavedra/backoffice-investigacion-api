FROM node

WORKDIR /investigacion

COPY package*.json ./

RUN npm i

COPY . ./

CMD [ "npm", "start" ]

