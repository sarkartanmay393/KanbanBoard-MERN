FROM node:20

WORKDIR /app

COPY ./backend ./backend
COPY ./frontend ./frontend

# Reset build files
RUN rm -fr backend/public/*

# Install dependencies and build the frontend
RUN cd frontend && npm install && npm run build && cd ..
RUN cp -fr frontend/build/* backend/public

EXPOSE 8080

WORKDIR /app/backend
RUN npm i -g ts-node
CMD ["npm", "run", "setup"]