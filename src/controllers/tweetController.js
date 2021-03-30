const { response, request } = require("express");

const tweets = require('../models/tweets');

//I-On envoie les 20 derniers tweets tous utilisateurs confondus
exports.findTwenty = (request, response) => {

    tweets.getTwenty((error, tweetsInfo) => {
        if(error){
            response.send(error.message);
        }

        response.render(('home.ejs'), {tweetsInfo});
    });
}