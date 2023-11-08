# Use a base image with Node.js
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy both the backend and frontend code into the container
COPY ./backend ./backend
COPY ./frontend ./frontend

# Reset build files
RUN rm -fr backend/public/*

# Install dependencies and build the frontend
RUN cd frontend && npm install && npm run build && cd ..
RUN cp -fr frontend/build/* backend/public

# # Expose the port your app will run on
EXPOSE 8080

WORKDIR /app/backend
RUN npm i -g ts-node
CMD ["npm", "run", "dev"]