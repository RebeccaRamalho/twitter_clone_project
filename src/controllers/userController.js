const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require("../models/user");

const SECRET = "pouetpouet";
const MAXAGE = Math.floor(Date.now() / 1000) + (60000*60000); // 1 hour of expiration of the cookie;

/*A_INSCRIPTION */

/*I_on click of the submit button we're redirected to the signup page*/

exports.signup = (request, response) => {

    response.render('signup.ejs')
}

/*II_creation of a new user*/

exports.newAccount = (request, response) => {

    const { first_name, last_name, birthday, city, email, telephone, username, password } = request.body;

    // console.log(request.body);

    user.getByUsername(username /*what i send to the model*/, (error, result)/*what i get from the model*/ => {

        /*1-Error managment */

        /*a_Server error managment*/


        if (error) {

            response.send(error.message)
        }

        /*b_User error managment (i check if username already exist in db)*/

        else if (result.length !== 0) {

            console.log('you have great tast! A username with this pseudo already exist sorry :(');
        }

        else {

            /*2-Password hashing*/

            const saltRounds = 10;

            bcrypt.hash(password, saltRounds, (error, hash) => {

                /*a_error managment */

                if (error) {
                    response.send(error.message)
                };

                /*b_we stock usapper's data (including the hashing psswd) into a variable so we can 
                  send it to the model so that the model can create the user in the db */

                const newUser = {
                    first_name,
                    last_name,
                    birthday,
                    city,
                    email,
                    telephone,
                    username,
                    password: hash
                };

                /*c_we send user's data of the form to the model*/

                user.create(newUser, (error, result) => {
                    if (error) {
                        response.send(error.message);
                    }
                    
                    response.redirect('/login');
                })

            })
        }


    })


}

/*B_CONNEXION */

/*I_au clique du bouton connexion redirection sur la page de connexion*/
exports.login = async (request, response) => {
    const alert_warning = await request.consumeFlash('warning');
    console.log(alert_warning);
    response.render('login.ejs', {alert_warning});

}

/*II_connexion*/

exports.authenticate = (request, response) => {

    /*1_retreive from the form  the username and password from the user who attempt to connect
        to check if he exist in the db*/

    const { username, password } = request.body;
    // console.log(request.body)


    /*2_*/
    user.getByUsername(username, async /*what i send to the model*/ (error, result)/*what i get from the model*/ => {

        /*1-Error managment */

        /*a_Server error managment*/

        if (error) {

            response.send(error.message)
        }

        /*b_User error managment (i check if username exist in db)*/

        else if (result.length === 0) {

            await request.flash('warning', 'We dont remember you! Are you sure this is your username?');

            response.redirect('/login');
        }

        else {

            /*c_check if password does exist in db */

            const hash = result[0].password;//??

            bcrypt.compare(password, hash, (error, correct) => {

                if (error) {
                    response.send(error.message);
                }

                /*1_if doesnt exist*/

                else if (!correct) {
                    response.send("Invalid password!");
                }

                /*2_if exist we send the key(token) to the user so he can enter into the web site*/
                else {

                    const user = {
                        // id: result[0].id,
                        last_name: result[0].last_name,
                        username: result[0].username,//ou récupère t-il ça?
                        exp: MAXAGE//expiration of the token of a specific user; 
                        
                    };

                    jwt.sign(user, SECRET, (error, token) => {
                        if (error) {
                            response.send(error.message);
                        }
                        else {
                            request.user = user;//request of not just on element of the const user but of all element of it;
                            // console.log(user);
                            //on stocke le token dans le cookie et on donne une durée de vie au cookie;
                            response.cookie('authcookie', token, { maxAge: 60000 * 60000 * 1000 });
                            response.redirect('/');
                        }
                    });
                }


            });
        }

    });

}

/*III_redirection to the homepage*/

exports.logout = (request, response) => {
    response.clearCookie("authcookie");
    response.redirect("/login");
}












