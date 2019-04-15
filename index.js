require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const es6Renderer = require("express-es6-template-engine");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const AllTickets = require("./models/allTickets");
const OpenTickets = require("./models/openTickets");
const PendingTickets = require("./models/pendingTickets");
const CompletedTickets = require("./models/completedTickets");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new FileStore(), // no options for now
    secret: process.env.SESSION_SECRET
  })
);

app.engine("html", es6Renderer, ejs.renderFile);
app.set("view engine", "html");
app.set("views", "views");

const homepageRoutes = require('./routes/homepage');
const requestRoutes = require("./routes/request");
const loginRoutes = require("./routes/login");
const dashboardRoutes = require("./routes/dashboard");
const allTicketsRoutes = require("./routes/allTickets");
const openTicketsRoutes = require("./routes/openTickets");
const pendingTicketsRoutes = require("./routes/pendingTickets");
const completedTicketsRoutes = require("./routes/completedTickets");
const detailsRoutes = require("./routes/details");
const createUserRoutes = require("./routes/createUser");




app.use("/login", loginRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/allTickets", allTicketsRoutes);
app.use("/openTickets", openTicketsRoutes);
app.use("/pendingTickets", pendingTicketsRoutes);
app.use("/completedTickets", completedTicketsRoutes);
app.use("/details", detailsRoutes);
app.use('/', homepageRoutes);
app.use('/request', requestRoutes);
app.use('/createUser', createUserRoutes);


// Emit to the client
//io.emit('smsStatus', data);


// THIS LETS US SERVE IMAGES & THE CSS FILE
app.use('/static', express.static('static'));
//app.use(express.static(  + '/smsMessages'));


app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
  // Connect to socket.io
  // const io = socketio();
  // io.on('connection', (socket) => {
  //   console.log('Connected');
  //   io.on('disconnect', () => {
  //     console.log('Disconnected');

});




