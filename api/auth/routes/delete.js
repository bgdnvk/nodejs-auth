const authService = require('../../../services/authService')

exports.deleteUser = async (req, res, next) => {
    const { id } = req.body;
    //if there's no id then we can't do anything
    if (!id) {
        return res.status(400).json({ message: "missing id" });
    }

    try {
        //this service returns the deleted user if it exists
        const user = await authService.getUserByIdAndDelete(id)
        //if user doesn't exist then we can't do anything
        if (!user) {
            return res.status(404).json({
                message: "Could not delete user",
                error: "User not found",
            });
        }
        //return success if the user is deleted
        return res.status(200).json({
            message: "User deleted successfully",
            user,
        });
    } catch (err) {
        return res.status(409).json({
            message: "User not deleted",
            error: err.message,
        });
    }
}
