const express = require('express');

const server = express();

const ejs = require('ejs');

const routers = require('./routers');

server.set('views', './src/views');

server.engine('ejs', ejs.renderFile);

server.use(express.urlencoded({extended: true}));

server.use(express.static("./src/assets"));

server.use(routers);

server.listen(8080, () => {
    console.log('connexion on point!');
})

