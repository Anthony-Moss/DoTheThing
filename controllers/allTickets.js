const User = require("../models/user");

async function allTicketsPage(req, res) {
  const userData = await User.getById(req.session.user);

  res.render("allTickets", {
    locals: {
      message: "View All Tickets Below!"
    }
  });
}
module.exports = {
  allTicketsPage
};
