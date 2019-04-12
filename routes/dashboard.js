const express = require("express");
const Router = express.Router;
const dashboardRoutes = Router();

const { loadDashboardPage } = require("../controllers/dashboard");

dashboardRoutes.get("/", loadDashboardPage);
dashboardRoutes.post("/", loadDashboardPage);
module.exports = dashboardRoutes;
