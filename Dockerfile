FROM node:latest as node
WORKDIR /app
COPY . .

RUN npm install && npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=node /app/dist/userapp .

ENTRYPOINT ["nginx", "-g", "daemon off;"]