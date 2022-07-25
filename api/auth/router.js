const express = require("express");
const router = express.Router();
const { login } = require("./routes/login");
const { register } = require("./routes/register");
const { updateUserToAdmin } = require("./routes/update");
const { deleteUser } = require("./routes/delete");

//get middleware
const verifyAccessToken = require("../middleware/token");
const checkAdmin = require("../middleware/checkAdmin");

router.route("/register").post(register);
//we can have the same route with different request types
router.route("/register").get((req, res) => res.send("Hello World!"));

//call example: http://localhost:5000/api/auth/login
router.route("/login").post(login);

router.route("/deleteuser").delete(deleteUser);

//load middleware
//make sure the user is logged
router.use(verifyAccessToken);
//make sure the logged user is an admin
router.use(checkAdmin);
//if the previous middleware doesn't throw an error then we update the user
//call example: http://localhost:5000/api/auth/updateuser/62c8ed790c6812f9ddcc1100
router.route("/updateuser/:id").put(updateUserToAdmin);

module.exports = router;
