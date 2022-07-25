const authService = require("../../../services/authService");

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    console.log("login req body is ", req.body);
    //simple checker for username and password
    if (!username || !password) {
        return res.status(400).json({ message: "username or password is missing" });
    }

    try {
        //get the data from our auth service
        const { user, validPassword, token, maxAge } = await authService.loginUser(username, password)
        //check if the user exists
        if (!user) {
            return res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            });
        }
        //return error if the password is incorrect
        if (!validPassword) {
            return res.status(401).json({
                message: "Login not successful",
                error: "Password is incorrect",
            });
        }
        //send our cookie with the token
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, //convert 2h to ms; maxAge uses miliseconds
        });

        //if everything is good return the user
        return res.status(200).json({
            message: "Login successful",
            user,
        });

    } catch (err) {
        res.status(401).json({
            message: "Login not successful",
            error: err.message,
        });
    }
};