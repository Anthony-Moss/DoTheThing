const User = require("../models/user");
const allTickets = require('../models/allTickets')
async function loadDashboardPage(req, res) {
  const open = 0;
  const pending = 1;
  const completed = 2;
  const theUser = await User.getById(req.session.user);
  const allOpenTickets = await allTickets.getOpenTickets(open);
  const allUserPendingTickets = await allTickets.getTicketInfoByUserIdAndStatus(theUser.id, pending);
  const allUserCompletedTickets = await allTickets.getTicketInfoByUserIdAndStatus(theUser.id, completed)

  res.render("dashboard", {
    locals: {
      message: "Welcome!",
      firstName: theUser.first_name,
      openTickets: allOpenTickets,
      pendingTickets: allUserPendingTickets,
      completedTickets: allUserCompletedTickets
    }
  });
}

async function updateOpenTicketsPage(req, res) {
  console.log('The id is ', req.params);
  const mainTicketId = parseInt(req.params.id);
  console.log(mainTicketId);
  await allTickets.updateToPending(mainTicketId);

  res.redirect(`/dashboard`);
}
module.exports = {
  loadDashboardPage,
  updateOpenTicketsPage
};
