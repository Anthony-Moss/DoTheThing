const express = require("express");
const createUserRouter = express.Router();

const {
    showCreateUser,
    checkIfEmailInUse
} = require("../controllers/createUser");

createUserRouter.get("/", showCreateUser);
createUserRouter.post("/", checkIfEmailInUse);

module.exports = createUserRouter;