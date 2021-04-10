const express = require('express');
const server = express();
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const routers = require('./routers');
const session = require('express-session');
const { flash } = require('express-flash-message');


server.set('views', './src/views');

server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

server.use(flash({ sessionKeyName: 'flashMessage' }));

server.engine('ejs', ejs.renderFile);

server.use(express.urlencoded({ extended: true }));

server.use(cookieParser());

server.use(express.static("./src/assets"));

server.use(routers);

server.listen(8080, () => {
    console.log('connexion on point!');
})

