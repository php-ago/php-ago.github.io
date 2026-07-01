FROM node:24-alpine

RUN apk update && apk add --no-cache git

WORKDIR /app

CMD ["npm", "run", "dev"]
