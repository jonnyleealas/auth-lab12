# auth-server
# OAuth API

# Description
This project is an API that allows user to create a username and password for sign up and login purposes. Passwords are encrypted, hashed, and a token is created for api usage. Mongodb is used as a database. Every pull request should run test using jest. Github actions runs these tests to allow revising before merging pull requests.

# Pull Requests Links
- [Lab 13 Pull Request](https://github.com/jonnyleealas/auth-server/pull/3)


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
DATABASE_URL=db-url
SECRET=<password>

```
# Step 3:
The following restful commands can be implemented to manipulate data. Make sure to be inside the auth-server folder and run commands inside of our terminal. Requirements for POST can be viewed inside user-model.js. Look in the schema schema obj. 
EX: http POST :3000/signup username=Jane password=Doe -> will create a username and a password. Password will be encrypted and a token created.

```
GET
POST
PUT
DELETE


```
```
- To view mongodb data type the following command inside terminal:- To delete mongodb data type the following commands inside terminal: mongo auth -> db.users.find({});
- To delete mongodb data type the following commands inside terminal: mongo auth -> db.users.remove({});
```
# Step 4: 
The following dependencies will install following step 1.
```
@code-fellows/supergoose": "^1.0.11",
   "base-64": "^0.1.0",
    "bcrypt": "^5.0.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.10.5"

```






# UML
[Lab13 UML](./assets/uml13.md)