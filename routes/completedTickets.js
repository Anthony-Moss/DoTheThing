const express = require("express");
const Router = express.Router;
const completedTicketsRoutes = Router();

const { completedTicketsPage, updateCompletedTicketsPage } = require("../controllers/completedTickets");

completedTicketsRoutes.get("/", completedTicketsPage);
completedTicketsRoutes.get("/:id", updateCompletedTicketsPage);
module.exports = completedTicketsRoutes;
