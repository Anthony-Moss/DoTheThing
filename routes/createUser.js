const express = require("express");
const createUserRouter = express.Router();

const {
    showCreateUser,
    checkEmail,
    addUser
} = require("../controllers/createUser");

createUserRouter.get("/", showCreateUser);
createUserRouter.post("/", checkEmail, addUser);

module.exports = createUserRouter;