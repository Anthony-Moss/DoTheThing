const User = require("../models/user");
const completedTickets = require("../models/completedTickets");

async function completedTicketsPage(req, res) {
  const theUser = await User.getById(req.session.user);
  const arrayOfTickets = await completedTickets.getAll();
  const joinTables = await completedTickets.getByAllTicketsId();

  res.render("completedTickets", {
    locals: {
      firtName: theUser.firstName,
      message: "View Completed Tickets Below!",
      tickets: arrayOfTickets,
      join: joinTables
    }
  });
}



module.exports = {
  completedTicketsPage
};
