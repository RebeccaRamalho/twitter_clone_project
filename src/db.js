const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rebecca",
    database: "twitter" 
})

db.connect((error) => {
   if(error) throw error;
   console.log('The connexion to twitter db worked!');
})

module.exports = db; 