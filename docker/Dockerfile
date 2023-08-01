#Base image
FROM node:16.18.0

USER root
COPY ["SERVICE.tgz", "/SERVICE.tgz"]
COPY ["env", "/SERVICE/.env"]
COPY ["start.sh", "/start.sh"]

RUN ln -fns /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && echo Asis/Ho_Chi_Minh > /etc/timezone

RUN tar -xzf SERVICE.tgz --directory /SERVICE && rm SERVICE.tgz

ENV REACT_APP_BASE_URL=https://binfo.bsi.com.vn
ENV REACT_APP_SOCKET_URL=https://binfo.bsi.com.vn/socket
ENV REACT_APP_RESOURCE_URL=http://192.168.13.24:9000

RUN chmod -R 775 /SERVICE

RUN chmod -R 775 /start.sh

EXPOSE 3000

WORKDIR /SERVICE

RUN npm install -f

RUN npm run build

ENTRYPOINT ["/start.sh"]