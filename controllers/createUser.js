const User = require("../models/user");
const escapeHtml = require("../utils");

async function showCreateUser(req, res) {
    res.render("createUser", {
    locals: {
        message: "Please fill in the below details to create an account.",
        firstName: "",
        lastName:"",
        email: "",
        password:"",
        confirmPassword:""
    }
    });
}

async function addUser(req, res) {
    await User.add(req.body);
    res.redirect('/login');
}

async function checkIfEmailInUse(req, res) {
    const theEmail = escapeHtml(req.body.email);
    const emailTaken = await User.checkEmail(theEmail);
    console.log(emailTaken);
    
    if (emailTaken) {
        res.render("createUser", {
            locals: {
                message: "Email address already registered, please use a different email or log in with your password at the login page",
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                confirmPassword:""
            }
        });
    } else {
        addUser(req.body);
        
        res.redirect('/login')
    }
    
    
}

module.exports = {
    showCreateUser,
    checkIfEmailInUse,
    addUser
};
