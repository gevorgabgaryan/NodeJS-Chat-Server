FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3115

CMD ["npm", "run", "start"]
