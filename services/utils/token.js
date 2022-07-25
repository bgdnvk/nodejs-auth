const jwt = require('jsonwebtoken')

//sign and make a new token for the user
exports.getToken = (username, expirationTime) => {
    //example of seeting up expiration time
    //2 hours to expire in seconds
    //const maxAge = 2 * 60 * 60

    //generate token for the user
    const token = jwt.sign(
        { username },
        process.env.TOKEN_KEY,
        {
            expiresIn: expirationTime //2h in seconds
        }
    )

    return token
}
