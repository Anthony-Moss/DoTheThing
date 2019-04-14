const express = require("express");
const createUserRouter = express.Router();

const {
    showCreateUser,
    checkIfEmailInUse,
    addUser
} = require("../controllers/createUser");

createUserRouter.get("/", showCreateUser);
createUserRouter.post("/", checkIfEmailInUse, addUser);

module.exports = createUserRouter;