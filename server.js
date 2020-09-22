'use strict'

const express = require('express');
const cors = require('cors');
const oauth = require('./auth/middleware/oauth')
const basicAuth = require('./auth/middleware/basic');
const authRouter = require('./auth/routes/auth-router');
const testRoutes = require('./test-routes');


const app = express()

// global middleware it get the req.body for you so you can call req.body.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(authRouter);
app.use(testRoutes);

app.get('/oauth', oauth, (req,res)=>{
    res.status(200).send('Github Oauth Ok')
})

// 404 not found handler
app.use('*', ( req, res, next)=>{
     res.status(404).send('not found')
})

app.get('/secretstuff', basicAuth, (req, res)=>{
    res.send('hi')
})


module.exports ={
    app,
    start: (port)=> app.listen(port, console.log('up on', port))
}