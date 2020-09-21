'use strict';

const express = require('express')

const basicAuth = require('../middleware/basic');
const bearer = require('../middleware/bearer');
const users = require('../models/users-model')


const router = express.Router();

router.post('/signup', async (req, res, next)=>{
    // username, pw, email, ets..
    // will be on req.body the body of the request to do this add global middleware express.json and exp.urlencoded
    // use the users module to create a new user
    try{
    let obj = {
        username: req.body.username,
        password: req.body.password
    }
    let record = new users(obj);

    let newUser = await record.save()

    let token = record.generateToken();

    let output = {
        user: newUser,
        token: token
    }
    console.log({output}, 'signup')
    // prove it
    res.status(200).json(output)

    } catch (e){
      next(e.message)
    }
 
})

router.post('/signin', basicAuth,(req, res, next)=>{
    let output = {
        user: req.user,
        token: req.token
    }
    console.log('signed in bruh')
 res.status(200).json(output)
 })
 
 router.get('/users',bearer, async (req, res, next)=>{
     const userList = await users.find({});
     res.set('auth',req.token);
     res.status(200).json(userList);
    
 })
 module.exports = router;