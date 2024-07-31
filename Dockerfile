# build stage
FROM node:16-slim AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm i -f
COPY . .
RUN npm run build

# production stage
FROM nginx:1.17-alpine AS production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh

# Ensure env.sh has correct line endings and execute permissions
RUN dos2unix /docker-entrypoint.d/env.sh && chmod +x /docker-entrypoint.d/env.sh

ENTRYPOINT ["/docker-entrypoint.d/env.sh"]

