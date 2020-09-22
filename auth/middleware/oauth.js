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
// Get the code
  let code = req.query.code;
  console.log('(1) CODE:', code)

// Exchange the code for a token
  let remoteToken = await exchangeCodeForToken(code);
  console.log('(2)remoteToken:', remoteToken)

//  Get user info from GitHub
  let remoteUser = await getRemoteUser(remoteToken);
  console.log('(3)remoteUser:', remoteUser);
// Connect that with our database

  let [user, token] = await getLocalUser(remoteUser);
  req.user = user;
  req.token = token;
  console.log('(4)getLocalUser:', localUser);

  next();
  } catch (e) { next(`Error: ${e.message}`); }
};

////////////////////////////////////////////////////////////

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
  
  let user =  await users.createFromOauth(remoteUser.login);
  let token = user.generateToken();

  return [user, token];
 


}