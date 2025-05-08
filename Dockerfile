FROM node:lts-slim AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.27.4-alpine-slim AS app

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]