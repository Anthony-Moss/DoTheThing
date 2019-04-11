const express = require("express");
const loginRouter = express.Router();

const { showLogin, checkLogin } = require("../controllers/login");

loginRouter.get("/", showLogin);
loginRouter.post("/", checkLogin);

module.exports = loginRouter;
