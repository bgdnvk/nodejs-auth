const express = require("express");
const routerTest = express.Router();

routerTest.route("/test").get((req, res) => res.send("GET endpoint from api/testroute"));

module.exports = {
    routerTest,
}