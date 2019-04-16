const express = require("express");
const Router = express.Router;
const allTicketsRoutes = Router();

const { allTicketsPage, submitRequest } = require("../controllers/allTickets");

allTicketsRoutes.get("/", allTicketsPage);
allTicketsRoutes.post("/", submitRequest);

module.exports = allTicketsRoutes;
