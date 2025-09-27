### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /usr/src/app
COPY TodoManager.Frontend/package.json TodoManager.Frontend/package-lock.json ./
RUN npm install
COPY TodoManager.Frontend/. .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY TodoManager.Frontend/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/todo-manager.frontend/browser /usr/share/nginx/html