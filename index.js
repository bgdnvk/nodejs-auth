//interact with our .env file
require("dotenv").config();
// --- routers ---
const authRouter = require("./api/auth/router");
const sessionExplorerRouter = require('./api/session-explorer/router');
const { routerTest } = require('./api/testroute');

//get our db connection
const connectDB = require("./db");
//import express package
const express = require("express");
//middleware to read cookies
//http://expressjs.com/en/resources/middleware/cookie-parser.html
const cookieParser = require('cookie-parser');

//get our express app
const app = express();
//get port from our .env file
const PORT = process.env.PORT || 5000;

// -- MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
// -- MIDDLEWARE

// -- ROUTES --

//hello world on: http://localhost:5000/
app.get("/", (req, res) => res.send("Hello World!"));

//make sure everything is set up correctly
//http://localhost:5000/test
app.use('/test', (req, res) => res.send("from test!"));

//router test to make sure you know how to use middleware and imports/exports
//call example: http://localhost:5000/api/cookie
app.use('/api', routerTest);

//session explorer endpoints to understand cookies and jwt
app.use('/api', sessionExplorerRouter);

//get the router from api/auth/router and use the endpoints (routes) from api/auth/routes
//call example: http://localhost:5000/api/auth/login
app.use('/api/auth', authRouter);

// -- ROUTES --

//connect to db
connectDB();

//start listening on the designed port
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));


// The unhandledRejection listener
//The unhandledRejection event is emitted whenever a promise rejection is not handled. 
//NodeJS warns the console about UnhandledPromiseRejectionWarning and immediately terminates the process. 
//The NodeJS process global has an unhandledRejection event.
process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error);
});