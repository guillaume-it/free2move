# https://medium.com/@wkrzywiec/build-and-run-angular-application-in-a-docker-container-b65dbbc50be8
# https://dzone.com/articles/how-to-dockerize-angular-app
### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
RUN pwd
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --prod
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/free2move-front /usr/share/nginx/html
# expose port 4200
# run nginx
CMD ["nginx", "-g", "daemon off;"]
