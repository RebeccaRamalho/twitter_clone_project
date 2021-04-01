const { response, request } = require("express");

const tweets = require('../models/tweets');

//I-On envoie les 20 derniers tweets tous utilisateurs confondus
exports.findTwenty = (request, response) => {

    tweets.getTwenty((error, tweetsInfo) => {
        if (error) {
            response.send(error.message);
        }

        response.render(('home.ejs'), { tweetsInfo });
    });
}
//II-On récupère les tweets d'un utilisateur en particulier
exports.findUserTweets = (request, response) => {

    const { id } = request.params;

    tweets.getUserTweets(id, (error, userTweet) => {//?
        if (error) {
            response.send(error.message);
        }
        response.render(('userTweets.ejs'), { userTweet });
    })

}

//III-Utilisateur je veux consulter le détail d'un tweet
exports.findUsersTweetsDetails = (request, response) => {

    const { id } = request.params;
    const { tweetId } = request.params;

    tweets.getUsersTweetsDetails(id, tweetId, (error, userTweetDet) => {//?

        response.render(('tweetDetails.ejs'), { id, userTweetDet });
       
    })


}



    