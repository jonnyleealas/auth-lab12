'use strict'
const users = require('../models/users-model')
//this is middlware that allows/prevents you to use token instead of having to use a pw
module.exports = (req, res, next)=>{
    //do you have header auth if not next 'invalid login'
    if(! req.headers.authorization){ next('invalid login')}

    // else get the token from req.headers.auth to use in users.authwithtoken
    //split creates an array out of the bearer token pop pops off the last thing in the array
    let token = req.headers.authorization.split(' ').pop();
   
// this method comes from user-models export
    users.authWithToken(token)
    .then(validUser => {
        req.user = validUser;
        req.token = validUser.generateToken();
        
        next();
    })
    .catch(err => next('invalid login'))

}