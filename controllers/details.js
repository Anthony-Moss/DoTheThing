const User = require("../models/user");
const allTickets = require("../models/allTickets");
const openTickets = require("../models/openTickets");
const pendingTickets = require("../models/pendingTickets");
const completedTickets = require("../models/completedTickets");
const details = require("../models/details")

// For this function it needs to take in or get a single tickets id from all_tickets then call the getTicketsInfo function
// passing it the ticket id so we can get all information about that ticket to render to page. 
async function loadDetailsPage(req, res) {
    const theUser = await User.getById(req.session.user);
    const ticketId = await allTickets.getTicketInfoByIdIfOpen();
    // await allTickets.newIssueSubmitted(req.body.issue_desc);
    const openTicket = new openTickets(req.body.id);
    const detailsArray = await details.getAll();

    if(openTicket) {
    res.render("details", {
        locals: {
        message: ticketId.id,
        firstName: theUser.first_name,
        ticketDesc: "Tickets desc will go here",
        ticketCreated: ticketId.timestamp,
        detail: detailsArray
        }
    });
    }
}

module.exports = {
    loadDetailsPage
}