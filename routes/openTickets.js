const express = require("express");
const Router = express.Router;
const openTicketsRoutes = Router();

const { openTicketsPage } = require("../controllers/openTickets");

openTicketsRoutes.get("/", openTicketsPage);
module.exports = openTicketsRoutes;
