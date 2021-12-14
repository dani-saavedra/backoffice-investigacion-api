FROM node

WORKDIR /investigacion

COPY ["package.json","package-lock.json","./"]

RUN npm i

COPY . .

CMD ["npm","start"]

