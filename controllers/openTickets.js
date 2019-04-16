
// const db = require('./conn');
const User = require("../models/user");
const allTickets = require("../models/allTickets");

async function openTicketsPage(req, res) {
  const theUser = await User.getById(req.session.user);
  const arrayOfTickets = await openTickets.getAll();
  const joinTables = await allTickets.getByAllTicketsId();

  res.render("openTickets", { //could put 'dashboard' here
    locals: {
      firtName: theUser.firstName,
      message: "View Open Tickets Below!",
      tickets: arrayOfTickets,
      join: joinTables
    }
  });
}
module.exports = {
  openTicketsPage
};