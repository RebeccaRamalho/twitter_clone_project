const cookieParser = require('cookie-parser');
const { response } = require('express');
const jwt = require('jsonwebtoken');

const SECRET = 'pouetpouet';//?

const isAuth = (request, response, next) => {

    //I_We retreive the token when an user try to access all the tweet of an user
    const token = request.cookies.authcookie; 

    console.log(token);

    //II_We check if the token is valid or not
    jwt.verify(token, SECRET, (error, user) => {

        /*a_error managment*/

        if(error){
            response.send(error.message)
        }
        /*b_checking of token validity*/
        else{

            const {name, username, exp} = user;// where do we retreive the name?

            /*1_if the cookie experation date is inferior to the actual date then the cookie has expired*/

            if(Date.now() /1000 >= exp){//why = and not just superior?
                response.clearCookie('authcookie');
                response.send("youre session has expired, try to reconnect you.");
            }
            else{

                request.user = {name, username};
                next();//?

            }

        }

       


    })


    console.log(token);
}

module.exports = isAuth; 