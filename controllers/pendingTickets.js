const User = require("../models/user");
const pendingTickets = require("../models/pendingTickets");
const allTickets = require('../models/allTickets');

async function pendingTicketsPage(req, res) {
  const pending = await allTickets.getAll();
  // console.log(pending);

  res.render("pendingTickets", {
    locals: {
      // firstName: theUser.firstName,
      message: "Pending Tickets",
      pending
    }
  });
}

async function updateOpenTicketsPage(req, res) {
  console.log('The id is ', req.params);
  const mainTicketId = parseInt(req.params.id);
  console.log(mainTicketId);
  await allTickets.updateToPending(mainTicketId);

  res.redirect('/allTickets');
}


module.exports = {
  pendingTicketsPage,
  updateOpenTicketsPage
};
