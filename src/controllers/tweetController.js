const { response, request } = require("express");
const tweets = require("../models/tweets");

//I_a On envoie les 20 derniers tweets tous utilisateurs confondus
exports.findTwenty = (request, response) => {
  tweets.getTwenty((error, tweetsInfo) => {
    if (error) {
      response.send(error.message);
    } else {
      response.render("home.ejs", { tweetsInfo });
    }
  });
};

//II_a On récupère les tweets d'un utilisateur en particulier
exports.findUserTweets = (request, response) => {
  const { id } = request.params;

  tweets.getUserTweets(id, request.user, (error, userTweet) => {
    //?

    if (error) {
      response.send(error.message);
    }
    response.render("userTweets.ejs", { userTweet, user: request.user });
  });
};
//I_b On récupère les tweets de l'utilisateur connecté
exports.findConnectedUserTweets = (request, response) => {
  const { user } = request;
  tweets.getConnectedUserTweets(user, (error, connectedUserTweet) => {
    //?

    if (error) {
      response.send(error.message);
    }
    response.render("connectedUserTweets.ejs", { connectedUserTweet });
  });
};
//III_a Utilisateur je veux consulter le détail d'un tweet
exports.findUsersTweetsDetails = (request, response) => {
  const { id } = request.params;
  const { tweetId } = request.params;

  tweets.getUsersTweetsDetails(id, tweetId, (error, userTweetDet) => {
    //?

    response.render("tweetDetails.ejs", { id, userTweetDet, tweetId });
  });
};

//III_b Utilisateur Connecté je veux consulter le détail d'un tweet
exports.findConnectedUsersTweetsDetails = (request, response) => {
  const { id } = request.params;
  // console.log(id);
  const { tweetId } = request.params;

  tweets.getConnectedUsersTweetsDetails(
    tweetId,
    (error, connectedUserTweetDet) => {
      //?

      response.render("connectedUserTweetsDetails.ejs", {
        connectedUserTweetDet,
        tweetId,
      });
    }
  );
};

//IV_b Utilisateur connecté je veux ajouter un tweet
exports.connectedUserPostNewTweet = (request, response) => {
  const { user } = request; //username

  tweets.getUserId(user, (error, connectedUserTweets) => {
    if (error) {
      response.send(error.message);
    }

    console.log("rahhh", connectedUserTweets[0].id_user);

    let idUser = connectedUserTweets[0].id_user;

    tweets.postTweet(request.body, idUser, (error, result) => {
      if (error) {
        response.send(error.message);
      }
      response.redirect("/");
      console.log(request.body);
    });
  });
};

//V-Utilisateur connecté je souhaite supprimer un tweet
exports.deleteUserTweets = (request, response) => {
  const { tweetsId } = request.params;
  console.log(tweetsId);

  tweets.deleteTweet(tweetsId, (error, result) => {
    //?

    if (error) {
      response.send(error.message);
    }
    response.redirect("/");
  });
};

//VI-Utilisateur je veux modifier le text de mon tweet
exports.uptadeUserTweets = (request, response) => {
  const { id } = request.params;
  const { tweetsId } = request.params;

  tweets.putUserNewTweet(tweetsId, request.body["message"], (error) => {
    if (error) {
      response.send(error.message);
    }
    response.redirect("/username");
  });

  console.log(request.body);
};
