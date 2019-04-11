const express = require("express");
const Router = express.Router;
const dashboardRoutes = Router();

const { loadDashboardPage } = require("../controllers/dashboard");

dashboardRoutes.get("/", loadDashboardPage);
module.exports = dashboardRoutes;
