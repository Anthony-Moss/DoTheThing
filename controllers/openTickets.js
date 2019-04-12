
const db = require('./conn');
const User = require("../models/user");
const openTickets = require("../models/openTickets");

async function openTicketsPage(req, res) {
  const theUser = await User.getById(req.session.user);
  const arrayOfTickets = await openTickets.getAll();

  res.render("openTickets", { //could put 'dashboard' here
    locals: {
      firtName: theUser.firstName,
      message: "View Open Tickets Below!",
      tickets: arrayOfTickets
    }
  });
}
module.exports = {
  openTicketsPage
};