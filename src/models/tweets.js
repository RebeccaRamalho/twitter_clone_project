const db = require('../db');

//I-On récupère les 20 derniers tweets tous utilisateurs confondus

exports.getTwenty = (callback) => {
    db.query('SELECT * FROM users INNER JOIN tweets ON users.id_user = tweets.id_user ORDER BY tweets.id DESC LIMIT 20; ', (error, result) => {
        if(error){
            console.log('error: ', error);
            callback(error, null);
            return;
        }

        console.log(result);
        callback(null, result);
    })

}