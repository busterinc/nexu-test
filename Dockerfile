FROM node:20-bullseye
# 20.17.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]

# docker build . -t nexu-test:latest
# docker image - o click derecho sobre la imagen run
# docker run nexu-test:latest - debuguea
# docker run --env-file=./.env -p 3001:3312 nexu-test:latest
