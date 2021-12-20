FROM node:12-alpine
WORKDIR /flashloans
RUN apk --update add git
COPY package.json .
RUN npm install
COPY . .
RUN yarn build
CMD ["yarn", "start"]
