const express = require("express");
const Router = express.Router;
const homepageRoutes = Router();

const { showHomepage } = require("../controllers/homepage");

homepageRoutes.get("/", showHomepage);

module.exports = homepageRoutes;
