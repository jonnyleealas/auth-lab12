'use strict';

const superagent = require('superagent');
const users = require('../models/users-model')


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const TOKEN_SERVER = process.env.TOKEN_SERVER;
const REDIRECT_URI = process.env.REDIRECT_URI;
const STATE = process.env.STATE;
const REMOTE_API = process.env.REMOTE_API;

module.exports = async (req,res,next)=>{
  try{
// Get the code/ this is from the req url http://localhost:3000/oauth?code=d7611f9c82522704d1ae&state=401n17
  let code = req.query.code;
  console.log('(1) CODE:', code)

// This becomes the token. Exchange the code for a token
  let remoteToken = await exchangeCodeForToken(code);
  console.log('(2)remoteToken:', remoteToken)

//  Get user info from GitHub
  let remoteUser = await getRemoteUser(remoteToken);
  console.log('(3)remoteUser:', remoteUser);
  
  // Mongo save new token. Give it the information from remoteUser
  let [user, token] = await getLocalUser(remoteUser);
  req.user = user;
  req.token = token;
  console.log('getLocalUser:',{
    user: user,
    token: token
  })
  next()
  } catch (e) { next(`Error: ${e.message}`); }
};
// Give it the code and it gets token @access_token same as the github access url
async function exchangeCodeForToken(code){
  let tokenResponse = await superagent.post(TOKEN_SERVER)
  .send({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    state: STATE,
    grand_type: 'authorization_code'

  })
  let access_token = tokenResponse.body.access_token;
  return access_token

}

async function getRemoteUser(token){
let userResponse = await superagent.get(REMOTE_API)
  .set('user-agent', 'express-server')
  .set('Authorization', `token ${token}`)
  let user = userResponse.body
  return user;
}

async function getLocalUser(remoteUser) {
  let obj = {
    username: remoteUser.login,
    password: 'vengeance'
  }
  let user = new users(obj)
  let save = await user.save(obj)
  let token = save.generateToken()
  return [user, token]
};
