const User = require("../models/user");
const completedTickets = require("../models/completedTickets");
const allTickets = require("../models/allTickets")

async function completedTicketsPage(req, res) {
  const theUser = await User.getById(req.session.user);
  const completedTickets = await allTickets.getAll();

  res.render("completedTickets", {
    locals: {
      firtName: theUser.firstName,
      message: "View Completed Tickets Below!",
      completedTickets
    }
  });
}

async function updateCompletedTicketsPage(req, res) {
  console.log('The id is ', req.params);
  const mainTicketId = parseInt(req.params.id);
  console.log(mainTicketId);
  await allTickets.updateToCompleted(mainTicketId);

  res.redirect('/dashboard');
}

module.exports = {
  completedTicketsPage,
  updateCompletedTicketsPage
};
