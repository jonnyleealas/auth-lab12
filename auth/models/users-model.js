'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonToken = require('jsonwebtoken');

const usedTokens = new Set();
const users = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})

users.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 5)
    console.log(' the password is', this.password)
})


users.methods.generateToken = function() {
    let tokenObj = {
        username: this.username,
        
    }
    let options = {
        expiresIn: 60
    }
    // turns user into an object
    let token = jsonToken.sign(tokenObj, process.env.SECRET, options)
    return token;
}

users.statics.validateBasic = async function (username, password){
    let user = await this.findOne({ username: username});    
    let isValid = await bcrypt.compare(password, user.password )

    if(isValid) { return user; }
    else { return undefined; }
}

users.statics.authWithToken = function (token) {
    if(usedTokens.has(token)){
        Promise.reject('Invalid TOken')
    } else {
        let parsedToken = jsonToken.verify(token, process.env.SECRET);
        usedTokens.add(token)
        
        console.log('Parsed Token:',parsedToken)
        return this.findOne({ username: parsedToken.username})
    }
  }
  

module.exports= mongoose.model('users', users)