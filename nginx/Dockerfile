FROM nginx:1.25

# Default config remove
RUN rm /etc/nginx/conf.d/default.conf

# Custom config copy
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]