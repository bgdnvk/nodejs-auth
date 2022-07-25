const jwt = require("jsonwebtoken");
require("dotenv").config();

//this only works if you use cookie-parser
const checkCookie = (req) => {
    console.log('inside checkCookie')
    console.log('all our cookies are: ', req.cookies)
    //we get the jwt cookie we need
    return req.cookies['jwt']
}

//middleware for verifying the JWT
const verifyAccessToken = (req, res, next) => {
    //define token
    let token;

    //authenticate through Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(' ')[1]
        //logs so you see what's happening
        console.log('auth bearer token')
        console.log({ token })
    }
    else {
        token = req.headers["x-access-token"] || checkCookie(req) || null
        //logs
        console.log('our token is from x-access-token header, a cookie or null')
        console.log({ token })
    }

    //if we can't get our token anywhere then the response is an error
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        //we use the JWT library to verify the token
        //and we need to know the token_key which we encrypted our information
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        //log
        console.log({ decoded })
        //the middleware adds the user information to the request and sends it to the route
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    //if you have doubts check Express middleware docs: http://expressjs.com/en/guide/using-middleware.html
    return next();
};

module.exports = verifyAccessToken;