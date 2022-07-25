const express = require("express");
const router = express.Router();
const verifyTokenMiddleware = require("../middleware/token")

//route to read our cookies after loggin in
router.route("/cookie").get((req, res) => {
    console.log('cookies: ', req.cookies)
    res.status(200).json({
        cookies: req.cookies
    })

});

//read more on middleware here: https://expressjs.com/en/guide/using-middleware.html
//token endpoint to check out how verifyToken middleware works
//if the token isn't correct then our middleware in /middleware/token gives an error responde
router.route("/token").post( verifyTokenMiddleware, (req, res) => {
    // in case you want to read everything from the request header
    // console.log({req})
    res.status(200).send("token correct: access granted!")
})


module.exports = router