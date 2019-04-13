const express = require("express");
const Router = express.Router;
const completedTicketsRoutes = Router();

const { completedTicketsPage } = require("../controllers/completedTickets");

completedTicketsRoutes.get("/", completedTicketsPage);
module.exports = completedTicketsRoutes;
