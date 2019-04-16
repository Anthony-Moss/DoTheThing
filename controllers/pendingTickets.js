const User = require("../models/user");
const pendingTickets = require("../models/pendingTickets");
const allTickets = require('../models/allTickets');

async function pendingTicketsPage(req, res) {
  const pend = 1;
  const pending = await allTickets.getOpenTickets(pend);

  res.render("pendingTickets", {
    locals: {
      message: "All Pending Tickets",
      pending: pending
    }
  });
}

async function updateOpenTicketsPage(req, res) {
  const theUser = await User.getById(req.session.user);
  const userId = theUser.id
  console.log('LOOK AT OUR ID ', userId);
  // console.log('The id is ', req.params);
  const mainTicketId = parseInt(req.params.id);
  console.log(mainTicketId);
  await allTickets.updateToPending(userId, mainTicketId);

  res.redirect('/dashboard');
}

module.exports = {
  pendingTicketsPage,
  updateOpenTicketsPage
};
