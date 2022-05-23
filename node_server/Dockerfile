FROM scratch
ADD alpine-minirootfs-3.15.4-aarch64.tar.gz /

WORKDIR /usr/src/app

RUN apk add --update nodejs npm

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333
CMD [ "node", "server.js" ]

LABEL org.opencontainers.image.authors="damian.ciechan@pollub.edu.pl"
