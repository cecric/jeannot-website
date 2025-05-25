FROM nginx:latest

COPY docker/nginx/conf_d_default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html