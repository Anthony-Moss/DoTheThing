const User = require("../models/user");

async function loadDashboardPage(req, res) {
  const userData = await User.getById(req.session.user);

  res.render("dashboard", {
    locals: {
      message: "Welcome!",
      firstName: userData.first_name
    }
  });
}
module.exports = {
  loadDashboardPage
};
