const db = require('./conn');

const User = require("../models/user");
const allTickets = require("../models/allTickets");

async function allTicketsPage(req, res) {
  const theUser = await User.getById(req.session.user);
  const arrayOfTickets = await allTickets.getAll();

  res.render("dashboard", {
    locals: {
      firtName: theUser.firstName,
      message: "View All Tickets Below!",
      // tickets: arrayOfTickets
    }
  });
}

module.exports = openTicketsPage;