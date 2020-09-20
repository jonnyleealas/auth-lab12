'use strict'

// this get loaded as async in the router 
// ie cost basicAuth = reuiqre alsdjsjdl;f

const bcrypt = require('bcrypt')
const base64 = require('base-64');
const users = require('../models/users-model')

// req.params, req.body, req.query, req.headers -- all express methods
// req. anything belongs to me
 module.exports = async (req, res, next) =>{
    try{
        let authorization = req.headers.authorization;
        let encoded = authorization.split(' ')[1]
        let cred = base64.decode(encoded);
        let [username, password] = cred.split(':');


        // get user instance from the model if we can
        let userRecord = await users.validateBasic(username, password);
  

        // if its good send a token

        req.token = userRecord.generateToken();

        req.user = userRecord;

        // next();
        
    } catch (e) {
        console.log(e)
        next('invalid login bruh');
    }
     next();
 }