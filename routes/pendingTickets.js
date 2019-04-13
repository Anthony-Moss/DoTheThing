const express = require("express");
const Router = express.Router;
const pendingTicketsRoutes = Router();

const { pendingTicketsPage } = require("../controllers/pendingTickets");

pendingTicketsRoutes.get("/", pendingTicketsPage);
module.exports = pendingTicketsRoutes;
