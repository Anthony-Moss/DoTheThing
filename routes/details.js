const express = require("express");
const detailsRouter = express.Router();

const { loadDetailsPage, renderNewDetailsAfterSubmission } = require("../controllers/details");

detailsRouter.get("/:id", renderNewDetailsAfterSubmission);
detailsRouter.post("/:id", renderNewDetailsAfterSubmission);

module.exports = detailsRouter;