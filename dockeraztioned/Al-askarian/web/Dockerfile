FROM nginx:alpine
RUN rm /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/

WORKDIR /etc/nginx/html

COPY ./web .
# ADD ./images ./images
# ADD ./json ./json

RUN ls -lAhF
