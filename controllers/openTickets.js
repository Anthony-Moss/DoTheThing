
// const db = require('./conn');
const User = require("../models/user");
const allTickets = require("../models/allTickets");

async function openTicketsPage(req, res) {
  const open = 0;
  const theUser = await User.getById(req.session.user);
  const allOpenTickets = await allTickets.getOpenTickets(open);
  // const joinTables = await allTickets.getTicketPendingTimestamp();

  res.render("openTickets", {
    locals: {
      firtName: theUser.firstName,
      message: "View Open Tickets Below!",
      tickets: allOpenTickets
      // join: joinTables
    }
  });
}
module.exports = {
  openTicketsPage
};