FROM node:4.8.6-alpine

VOLUME /data

WORKDIR /app
COPY . .

RUN npm install --build-from-source --registry=https://registry.npm.taobao.org \
                --disturl=https://npm.taobao.org/mirrors/node \
                --production && \
    npm cache clean && rm package.json

CMD ["node","app.js"]

EXPOSE 3000