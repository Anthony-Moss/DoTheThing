const express = require("express");
const Router = express.Router;
const allTicketsRoutes = Router();

const { allTicketsPage } = require("../controllers/allTickets");

allTicketsRoutes.get("/", allTicketsPage);
module.exports = allTicketsRoutes;
