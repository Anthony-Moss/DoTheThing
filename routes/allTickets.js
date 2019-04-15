const express = require("express");
const Router = express.Router;
const allTicketsRoutes = Router();

const { allTicketsPage, submitRequest, updateTicketList } = require("../controllers/allTickets");

allTicketsRoutes.get("/", allTicketsPage);
allTicketsRoutes.post("/", submitRequest);
// allTicketsRoutes.post("/", updateTicketList);
module.exports = allTicketsRoutes;
