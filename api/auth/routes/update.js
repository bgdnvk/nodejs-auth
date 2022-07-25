const authService = require("../../../services/authService");

//after loading the middleware we can finally call to update the user
exports.updateUserToAdmin = async (req, res, next) => {
    //get the id from the query params
    const id = req.params.id

    if (!id) {
        return res.status(400).json({ message: "missing id" });
    }

    try {
        console.log('we have passed all the middleware and we are inside updateUsertoAdmin')
        const updatedUser = await authService.updateUser(id)

        return res.status(200).json({
            message: "User updated successfully",
            updatedUser,
        });
    } catch (err) {
        return res.status(400).json({
            message: "User not updated",
            error: err.message,
        });
    }
}