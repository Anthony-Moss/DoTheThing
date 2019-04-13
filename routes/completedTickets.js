const express = require("express");
const Router = express.Router;
const completedTicketsRoutes = Router();

const { completedTicketsPage } = require("../controllers/openTickets");

completedTicketsRoutes.get("/", completedTicketsPage);
module.exports = completedTicketsRoutes;
