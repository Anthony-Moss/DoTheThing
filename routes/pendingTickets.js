const express = require("express");
const Router = express.Router;
const pendingTicketsRoutes = Router();

const { pendingTicketsPage, updateOpenTicketsPage } = require("../controllers/pendingTickets");

pendingTicketsRoutes.get("/", pendingTicketsPage);
pendingTicketsRoutes.post("/", updateOpenTicketsPage);
module.exports = pendingTicketsRoutes;
