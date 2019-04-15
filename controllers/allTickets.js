const User = require("../models/user");
const allTickets = require("../models/allTickets");

async function allTicketsPage(req, res) {
  const theUser = await User.getById(req.session.user);
  //const arrayOfTickets = await allTickets.getAll();
  const arrayOfTickets = await allTickets.getOpenTickets(1);

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
  const arrayOfTickets = await allTickets.getAll();
  await allTickets.newIssueSubmitted(req.body.issue_desc);
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

async function updateTicketList(req, res) {
  const theUser = await User.getById(req.session.user);
  const arrayOfTickets = await allTickets.getAll();
  // const ticket = await allTickets.getTicketInfo(); 
  console.log('is this')
  await allTickets.moveToPending(req.body);
  console.log('even happening')
  // const newRequests = new allTickets(req.body.issue_desc);

  res.render("allTickets", {
    locals: {
      message: "Welcome!",
      firstName: theUser.first_name
    }
  });
}

module.exports = {
  allTicketsPage,
  submitRequest,
  updateTicketList
};
