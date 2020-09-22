# auth-server
# Github OAuth Testing

# Description
This project test using Oauth sigin with Github.

# Pull Requests Links
- [Lab 12b]()


# Step 1:
Open terminal and from your directory run the following commands.
```
1. npm init -y(will load dependency packages)
2. touch.env
```
# Step 2:
Insert the following inside of your .env file
```
PORT=<openport>
MONGODB_URI=<mongouri>
SECRET=<secret>
CLIENT_ID=<client id>
CLIENT_SECRET=<client secret>
TOKEN_SERVER=<server token>
REDIRECT_URI=<redirect uri>
STATE=<state>
REMOTE_API=<remote api>

```
# Step 3: Github documentation 
- [Github Documentation](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)


```
- To view mongodb data type the following command inside terminal:- To delete mongodb data type the following commands inside terminal: mongo auth -> db.users.find({});
- To delete mongodb data type the following commands inside terminal: mongo auth -> db.users.remove({});
```
# Step 4: 
The following dependencies will install following step 1.
```
  "base-64": "^0.1.0",
    "bcrypt": "^5.0.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.10.5",
    "superagent": "^6.1.0"

```
# Step 5 Github OAuth Login
1. Go live in terminal to access login link.
1. Click login link.
1. Click green Authorize button to accept access to account.

# Task Checklist
- [x] Request Code from Github
- [x] Exchange Code for a token
- [x] Use token to access user data
- [x] Save user information in mongoDb






# UML
- [Lab12b Bearer UML](./assets/bearer.md)
- [Lab12b OAuth UML](./assets/oauth.md)
- [Lab13 UML](./assets/uml13.md)
