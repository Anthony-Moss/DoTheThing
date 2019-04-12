const User = require("../models/user");
const pendingTickets = require("../models/pendingTickets");

async function pendingTicketsPage(req, res) {
  const theUser = await User.getById(req.session.user);
  const arrayOfTickets = await pendingTickets.getAll();

  res.render("pendingTickets", {
    locals: {
      firtName: theUser.firstName,
      message: "View Pending Tickets Below!",
      // tickets: arrayOfTickets
    }
  });
}
module.exports = {
  pendingTicketsPage
};
