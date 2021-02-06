FROM node:12

WORKDIR /usr/src

COPY ./ /usr/src
RUN npm install

ENTRYPOINT []
CMD ["node", "/usr/src/app/server.js"]