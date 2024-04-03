# Boilerplate Project

A boilerplate project created using NodeJs, ExpressJs Framework and PostgreSQL databases. 

## Getting Started

The Boilerplate contains the minimal implementation required to create a new project. The repository code is preloaded with some basic components like basic app architecture, migrations, Api documentation using swagger and required dependencies to create a new project. By using boiler plate code as standard initializer, we can have same patterns in all the projects that will inherit it. This will also help in reducing setup & development time by allowing you to use same code pattern and avoid re-writing from scratch.

## How to Use 

**Step 1:**

Download or clone this repo by using the link below:

```
https://git.ssasoft.com/musman/nodejs-express.git
```

**Step 2:**

Copy .env.sample file into .env file and add replace variables values to the actual environment variables

```
cp .env.example .env
```
**Step 3:**

Go to project root and execute the following command in console to get the required dependencies: 

```
npm install
```

**Step 4:**

To run all migrations and seeds execute the following command

```
npm run migrate
```

## Start Server

```
npm run dev
```

## Swagger Test RestAPI

Test all rest api, paste the following url in your browser

```
http://localhost:3002/api/v1/docs/
```

## Postgresql Transaction:

Managed transaction implemented here. To test the transaction use the following endpoint.
```
http://localhost:3002/post/create
```
and data should be in following format for transaction.

```
{
    "post": {
        "title": "Testing 22 Dec",
        "comments": "Ignore these things"
    },
    "postTags": ["Dummy", "Test", "Awesome"]
}
```

Here association between users, posts and tags has been implemented.

## Test Cases using Cypress

To run the test cases you need to run the following command. This will open cypress configuration for e2e tests and from there you can run all the tests.

```
npm run test
```

## Authentication

For endpoint authentication I have implemented passport, password-local, and password-jwt npm package with jsonwebtoken 

## Note

All endpoints are secured, please add authorization headers in endpoint.

## Features:

* Swagger
* Cypress
* Morgan
* Cors
* Sequelize ORM
* PostgreSQL
* Hooks
* Migrations
* Seeds
* Sequelize PostgreSQL Transaction
* passport, passport-local and passport-jwt 

**Reset Migration:**

To reset all migrations execute the following command

```
npm run migrate:reset
```

## 💼 Technical Skills
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
