const User = require("../models/user");
const pendingTickets = require("../models/pendingTickets");

async function pendingTicketsPage(req, res) {
  const theUser = await User.getById(req.session.user);
  const arrayOfTickets = await pendingTickets.getAll();
  const joinTables = await pendingTickets.getByAllTicketsId();

  res.render("pendingTickets", {
    //could put 'dashboard' here
    locals: {
      firtName: theUser.firstName,
      message: "View Open Tickets Below!",
      tickets: arrayOfTickets,
      join: joinTables
    }
  });
}
module.exports = {
  pendingTicketsPage
};
