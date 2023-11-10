rm -fr backend/dist backend/node_modules
rm -fr frontend/node_modules

cd frontend && npm install && npm run build && cd ..

cp -fr backend/* server-deploy
cp -fr frontend/build/* server-deploy/public
rm -fr frontend/build frontend/node_modules

cd server-deploy && npm install