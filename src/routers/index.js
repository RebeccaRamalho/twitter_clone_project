/*I_outillage*/

const express = require('express');
const isAuth = require('../middlewares/isAuth');
const tweetController = require('../controllers/tweetController')
const userController = require('../controllers/userController')
const routers = express.Router();


/*II_requêtes*/

/*A*/

/*1-liste des 20 derniers tweets*/

routers.get('/', tweetController.findTwenty);

/*2_a Liste des tweets d'un utilisateur en particulier*/

routers.get('/users/:id', tweetController.findUserTweets);

/*2_b Liste des tweets de l'utilisateur connecté */
routers.get('/username', isAuth, tweetController.findConnectedUserTweets);

/*3_a Utilisateur je veux consulter le détail d'un tweet*/
routers.get('/users/:id/tweets/:tweetId', tweetController.findUsersTweetsDetails);

/*3_b Utilisateur connecté je veux consulter le détail d'un tweet*/

routers.get('/tweeto/:tweetId', tweetController.findConnectedUsersTweetsDetails);

/*B*/

/*4-Utilisateur je veux poster un nouveau tweet*/

// routers.post('/', isAuth, tweetController.postNewTweet)

/*4_b Utilisateur connecté je veux poster un nouveau tweet*/

routers.post('/', isAuth, tweetController.connectedUserPostNewTweet);

/*5-Utilisateur connecté je modifier le texte de mon tweet*/

routers.post('/tweets/:tweetsId', isAuth, tweetController.uptadeUserTweets);

/*6-Utilisateur connecté je veux supprimer l'un de mes tweet*/

routers.post('/tweet/:tweetsId', isAuth, tweetController.deleteUserTweets);//pk on ne récupère pas l'id avec delete?response.redirect('/username');


/*C*/

/*1-Utilisateur je veux m'inscrire*/

routers.get("/signup", userController.signup);

routers.post("/signup", userController.newAccount);

/*2-Utilisateur je veux me connecter*/

routers.get("/login", userController.login);

routers.post("/login", userController.authenticate);

/*3-Utilisateur je veux me déconnecter*/

routers.get("/logout", userController.logout);


/*III_export de routeur*/
module.exports = routers; 