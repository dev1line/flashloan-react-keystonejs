FROM node:12-alpine
WORKDIR /cms-keystonejs-docker
RUN apk --update add git
COPY package.json .
RUN yarn install --flat
COPY . .
# RUN yarn build
CMD ["yarn", "dev"]
