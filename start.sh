#!/bin/bash
echo "----Detect NodeJS---"
node -v || exit 1

echo "----Detect Yarn-----"
yarn -v || exit 1

echo "----Detect Vue-cli--"
vue -V || exit 1

echo "----Detect SQLite3--"
sqlite3 -version || exit 1


echo "----BackEnd Dep-----"
cd ./src/backend/
yarn install
npm start fork &

cd ..
echo "---FrontEnd Dep-----"
cd frontend
yarn install
yarn serve