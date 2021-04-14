FROM node:alpine

WORKDIR /bin/drone-s3
COPY package*.json ./
RUN npm ci --only=production

COPY src src

ENTRYPOINT [ "node", "/bin/drone-s3" ]