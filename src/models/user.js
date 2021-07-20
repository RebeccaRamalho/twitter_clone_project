const { request, response } = require("express");
const db = require("../db");

/*INSCRIPTION et CONNEXION */

/*I_on récupère les usernames dynamiquement pour que le controller vérifie si 
lors de l'inscription il n'existe pas déjà*/

exports.getByUsername = (username, callback) => {
  db.query(
    `SELECT * FROM users WHERE username = "${username}";`,
    (error, result) => {
      if (error) {
        console.log("error: ", error);
        callback(error, null);
        return;
      }

      callback(null, result);
    }
  );
};

/*II_on inscrit l'utilisateur dans la base de donnée grâce aux données récupérées (dynamiquement) dans le formulaire*/
exports.create = (user, callback) => {
  db.query(
    `INSERT INTO users(last_name, first_name,  bith_date, username, mail, password, phone, city) value ("${user.last_name}", "${user.first_name}", "${user.birthday}", "${user.username}", "${user.mail}", "${user.password}","${user.phone}", "${user.city}");`,
    (error, result) => {
      if (error) {
        console.log("error: ", error);
        callback(error, null);
        return;
      }

      callback(null, result);
    }
  );
};
