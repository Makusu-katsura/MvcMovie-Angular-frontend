FROM node:10.13-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
RUN npm install -g @angular/cli

COPY . .
RUN chmod -R 777 *
RUN npm install
RUN npm run build

FROM nginx:1.18.0-alpine as prod-stage 

COPY --from=builder /app/dist/MovieApp/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx","-g","daemon off;"]