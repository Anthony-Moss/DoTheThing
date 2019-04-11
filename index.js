require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const app = express();
const es6Renderer = require("express-es6-template-engine");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const AllTickets = require("./models/allTickets");
app.engine("html", es6Renderer);
app.set("view engine", "html");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new FileStore(), // no options for now
    secret: process.env.SESSION_SECRET
  })
);

const loginRoutes = require("./routes/login");
const dashboardRoutes = require("./routes/dashboard");
const allTicketsRoutes = require("./routes/allTickets");

app.use("/login", loginRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/allTickets", allTicketsRoutes);

app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
