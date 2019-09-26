FROM node:10.16.3 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
RUN npm install -g serve
CMD serve -s build