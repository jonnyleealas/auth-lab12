'use strict'
require('dotenv').config();
// dependencies 
let mongoose = require('mongoose')
let server = require('./server.js')
// connect mongoose server
mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
// start the server
server.start(process.env.PORT)