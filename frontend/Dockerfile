FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

<<<<<<< HEAD
=======
RUN chown -R node /app/node_modules

USER node

>>>>>>> 07fec92 (add backend routes)
CMD ["npm", "start"]