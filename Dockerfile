FROM node:lts-slim AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.27.4-alpine-slim AS app

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]