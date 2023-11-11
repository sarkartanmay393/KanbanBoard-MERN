FROM node:latest

WORKDIR /app
COPY . .

RUN bash prod.sh

WORKDIR /app/server-deploy

EXPOSE 80
CMD ["npm", "start"]