#!/bin/bash

# Change to the 'backend' directory and start the backend server
cd backend && npm i && cd ..

# Change to the 'frontend' directory and start the frontend server
cd frontend && npm i && cd ..

# npm i -g concurrently

concurrently "cd backend && npm start"  "cd frontend && npm start"