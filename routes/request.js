const express = require("express");
const Router = express.Router;
const requestRoutes = Router();

const { showRequestPage } = require("../controllers/request");

requestRoutes.get("/", showRequestPage);

module.exports = requestRoutes;
