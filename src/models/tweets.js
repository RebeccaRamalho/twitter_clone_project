const db = require('../db');

//I-On récupère les 20 derniers tweets tous utilisateurs confondus

exports.getTwenty = (callback) => {
    db.query('SELECT * FROM users INNER JOIN tweets ON users.id_user = tweets.id_user ORDER BY tweets.id DESC LIMIT 20; ', (error, result) => {
        if(error){
            console.log('error: ', error);
            callback(error, null);
            return;//?
        }

        // console.log(result);
        callback(null, result);
    })

}
//II-On récupère les tweets d'un utilisateur en particulier
exports.getUserTweets = (id, callback) => {
    db.query(`SELECT * FROM users INNER JOIN tweets ON users.id_user = tweets.id_user WHERE tweets.id_user= ${id};`, (error, result) =>{
        if(error){
            console.log('error :', error);
            callback(error, null);
            return;
        }
        // console.log(result);
        callback(null, result);
    })
       
} 

//III-Utilisateur je veux consulter le détail d'un tweet
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

