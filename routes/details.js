const express = require("express");
const detailsRouter = express.Router();

const { loadDetailsPage } = require("../controllers/details");

detailsRouter.get("/:id", loadDetailsPage)

module.exports = detailsRouter;