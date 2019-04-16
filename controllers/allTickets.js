const User = require("../models/user");
const allTickets = require("../models/allTickets");

async function allTicketsPage(req, res) {
  const theUser = await User.getById(req.session.user);
  const arrayOfTickets = await allTickets.getAll();

  res.render("allTickets", {
    locals: {
      firtName: theUser.firstName,
      message: "View All Tickets Below!",
      tickets: arrayOfTickets
    }
  });

}

async function submitRequest(req, res) {
  const theUser = await User.getById(req.session.user);
  const newTicket = await allTickets.newIssueSubmitted(req.body.issue_desc);
  newTicket;
  const theDesc = (req.body.issue_desc);
  console.log(theDesc)
  const ticketData = await allTickets.getTicketInfoByIssue(theDesc);
  const newRequests = new allTickets(req.body.issue_desc);

  if (newRequests) {
    res.render("thankyou", {
      locals: {
        message: "Welcome!",
        firstName: theUser.first_name
      }
    });
  }
}

module.exports = {
  allTicketsPage,
  submitRequest,
};
