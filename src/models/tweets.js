const db = require('../db');

//I-On récupère les 20 derniers tweets tous utilisateurs confondus
exports.getTwenty = (callback) => {
    db.query('SELECT * FROM users INNER JOIN tweets ON users.id_user = tweets.id_user ORDER BY tweets.id DESC LIMIT 20; ', (error, result) => {
        if(error){
            console.log('error: ', error);
            callback(error, null);
            return;//?
        }

        callback(null, result);
    })

}
//II_a On récupère les tweets d'un utilisateur en particulier
exports.getUserTweets = (id, username, callback) => {
    db.query(`SELECT * FROM users INNER JOIN tweets ON users.id_user = tweets.id_user WHERE tweets.id_user= ${id};`, (error, result) =>{
        if(error){
            console.log('error :', error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
       
} 
//II_b On récupère les tweets de l'utilisateur connecté
exports.getConnectedUserTweets = (user, callback) => {
    db.query(`SELECT * FROM users INNER JOIN tweets ON users.id_user = tweets.id_user WHERE users.username='${user.username}';`, (error, result) =>{
        if(error){
            console.log('error :', error);
            callback(error, null);
            return;
        }

        // console.log('users info : ', result[0].id_user);
        callback(null, result);
        
    })
       
} 

//III_a Utilisateur je veux consulter le détail d'un tweet
exports.getUsersTweetsDetails = (id, tweetId, callback) => {
    db.query(`SELECT * FROM users INNER JOIN tweets ON users.id_user = tweets.id_user WHERE tweets.id_user= ${id} AND tweets.id = ${tweetId} ;`, (error, result) =>{
        if(error){
            console.log('error :', error);
            callback(error, null);
            return;
        }
        // console.log(result);
        callback(null, result);
    })
       
} 
//III_b Utilisateur je veux consulter le détail d'un tweet
exports.getConnectedUsersTweetsDetails = (tweetId, callback) => {
    db.query(`SELECT * FROM users INNER JOIN tweets ON users.id_user = tweets.id_user WHERE tweets.id = ${tweetId} ;`, (error, result) =>{
        if(error){
            console.log('error :', error);
            callback(error, null);
            return;
        }
        // console.log(result);
        callback(null, result);
    })
       
} 
//IV-Utilisateur je veux ajouter un tweet
exports.postTweet = (tweetText, id_user, callback) => {
    db.query(`insert into tweets(texts, creation_date, id_user) values ("${tweetText.message}", CURDATE(), ${id_user});`, (error, result) =>{
        if(error){
            console.log('error :', error);
            callback(error, null);
            return;
        }
        // console.log(result);
        callback(null, result);
    })
}

//V-Utilisateur je veux supprimer un tweet
exports.deleteTweet = (id, callback) => {
    db.query(`DELETE FROM tweets WHERE id=${id};`, (error, result) =>{
        if(error){
            console.log('error :', error);
            callback(error, null);
            return;
        }
        console.log(id);
        callback(null, result);
    })
}

//VI-Utilisateur je veux modifier le texte de mon tweet
exports.putUserNewTweet = (id, newValue, callback) => {
    db.query(`UPDATE tweets SET texts = "${newValue}" WHERE id = ${id};`, (error, result) =>{
        if(error){
            console.log('error :', error);
            callback(error, null);
            return;
        }
        // console.log(result);
        callback(null, result);
        
    })
       
} 

/*Requête de sauvetage*/
exports.getUserId = (user,  callback) => {
    db.query(`SELECT * FROM users WHERE username='${user.username}';`, (error, result) =>{
        if(error){
            console.log('error :', error);
            callback(error, null);
            return;
        }
        // console.log('mmm', result);
        callback(null, result);
        
    })
       
} 