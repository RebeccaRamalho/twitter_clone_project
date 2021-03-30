                    /*I_outillage*/

const express = require('express');
const tweetController = require('../controllers/tweetController')
const routers = express.Router();

                    /*II_requêtes*/

            /*1)liste des 20 derniers tweets*/

routers.get('/', tweetController.findTwenty);

           /*2)Liste des tweets d'un utilisateur précis*/
           
// routers.get('/users/:id', tweetController.findOne);



                /*III_export de routeur*/
module.exports = routers; 