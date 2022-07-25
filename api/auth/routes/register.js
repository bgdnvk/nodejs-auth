const authService = require("../../../services/authService");

exports.register = async (req, res, next) => {
    console.log("inside register");

    const { username, password } = req.body;
    console.log("req body is ", req.body);

    //check if the username already exists
    const oldUser = await authService.getUserByUsername(username);

    console.log({ oldUser });
    if (oldUser) {
        return res.status(409).send("user already exists");
    }

    //simple rule for the password
    if (password.length < 6) {
        return res.status(400).json({ message: "password less than 6 characters" });
    }

    try {
        //define variables with destructuring
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        const { newUser, token, maxAge } = await authService.registerUser(
            username,
            password
        );
        //send our cookie with the token
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, //convert 2h to ms; maxAge uses miliseconds
        });

        //response status and display the created user
        return res.status(201).json({
            message: "User created successfully",
            newUser,
        });
    } catch (err) {
        //if there are any errors we will get a message back
        return res.status(401).json({
            message: "User not created",
            error: err.message,
        });
    }
};
