const User = require("../models/user");
const escapeHtml = require("../utils");

async function showLogin(req, res) {
  res.render("login", {
    locals: {
      message: "Please login to go to your dashboard.",
      email: ""
    }
  });
}
async function checkLogin(req, res) {
  const theEmail = escapeHtml(req.body.email);
  const thePassword = escapeHtml(req.body.password);
  console.log(theEmail);
  console.log(thePassword);
  // call the User function that checks username against username in database
  // if the username exists, creates an instance of User
  const theUser = await User.getByEmail(theEmail);

  // get the password from the form (it is .password because that is the name we gave it in HTML)
  const passwordIsCorrect = theUser.checkPassword(thePassword);

  // use the checkPassword instance method to check if it matches saved password in database
  // username and password match what is in the system

  console.log(`This is the username: ${theUser.username}`);

  if (passwordIsCorrect) {
    // then load the dashboard and save the user info in a session
    // session is how we will track whether or not user can see the dashboard
    // store instance of user in the session
    req.session.user = theUser.id;
    req.session.save(() => {
      res.redirect("/dashboard");
    });
    // redirect the page to localhost:3001/dashboard
    // if the username is incorrect
    // if the password is incorrect
  } else {
    // render login page (index) again with the message password not correct
    res.render("login", {
      locals: {
        email: req.body.email,
        message: "Incorrect email/password. Please try again."
      }
    });
  }
}

module.exports = {
  showLogin,
  checkLogin
};
