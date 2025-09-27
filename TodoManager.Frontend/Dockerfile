### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /usr/src/app
COPY TodoManager.Frontend/package.json TodoManager.Frontend/package-lock.json ./
RUN npm ci
COPY TodoManager.Frontend/. .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
RUN apk add --no-cache gettext
COPY TodoManager.Frontend/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/todo-manager.frontend/browser /usr/share/nginx/html
COPY TodoManager.Frontend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENV BACKEND_URL=""
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
