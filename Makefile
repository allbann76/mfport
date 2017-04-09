install:
	chmod 777 ./tasks/*
	npm install

run:
	nodemon server/app.js