const User = require("../models/user");
const pendingTickets = require("../models/pendingTickets");
const allTickets = require('../models/allTickets');

async function pendingTicketsPage(req, res) {
  const theUser = await User.getById(req.session.user);
  const arrayOfTickets = await pendingTickets.getAll();
  const joinTables = await pendingTickets.getByAllTicketsId();

  res.render("pendingTickets", {
    //could put 'dashboard' here
    locals: {
      // firstName: theUser.firstName,
      message: "View Pending Tickets Below!",
      tickets: arrayOfTickets,
      join: joinTables
    }
  });
}

async function updateOpenTicketsPage(req, res) {
  // const theUser = await User.getById(req.session.user);
  // const arrayOfTickets = await allTickets.getAll();
  const mainTicketId = req.body.id
  console.log(mainTicketId);
  const ticketInfo = await allTickets.getTicketInfo(1);
  // console.log(ticketInfo);
  console.log(ticketInfo.id);
  // console.log(ticketId);
  const openTickets = await allTickets.updateToPending(ticketInfo.id);
  console.log(openTickets);

  res.render("pendingTickets", {
    locals: {
      message: "View Pending Tickets Below!",
      // join: joinTables,
      // ticketId: 1,
      // ticketIssueDesc: 1,
      // ticketTime: 1
      // ^^ We would map through this in the HTML
    }
  });
}


module.exports = {
  pendingTicketsPage,
  updateOpenTicketsPage
};
