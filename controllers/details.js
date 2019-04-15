const User = require("../models/user");
const allTickets = require("../models/allTickets");
const openTickets = require("../models/openTickets");
const pendingTickets = require("../models/pendingTickets");
const completedTickets = require("../models/completedTickets");
const details = require("../models/details")

// For this function it needs to take in or get a single tickets id from all_tickets then call the getTicketsInfo function
// passing it the ticket id so we can get all information about that ticket to render to page. 
async function loadDetailsPage(req, res) {
    const user = await User.getById(req.session.user);
    console.log('user ', user);
    const ticketId = req.params.id;
    const ticket = await allTickets.getTicketInfo(ticketId);
    console.log('Ticket : ', ticket);
    const openTicket = new openTickets(req.body.id);
    const detailsArray = await details.getNotesByTicketId(ticketId);

    if(openTicket) {
    res.render("details", {
        locals: {
        ticketId,
        message: ticketId,
        firstName: user.first_name,
        ticketDesc: "Tickets desc will go here",
        ticketCreated: ticketId.timestamp,
        detail: detailsArray
        }
    });
    }
}


async function renderNewDetailsAfterSubmission(req, res) {
    const user = await User.getById(req.session.user);
    // console.log('where is the user', req.session.user);
    const ticketId = req.params.id;
    await details.newDetailSubmitted(req.body.note_content, user.id, ticketId);
    // const openTicket = new openTickets(req.body.id);
    const detailsArray = await details.getNotesByTicketId(ticketId);
    const newDetails = new details(req.body.note_content, req.body.users_id, req.body.all_tickets_id);

    if(newDetails) {
    res.render("details", {
        locals: {
        ticketId,
        message: ticketId,
        firstName: user.first_name,
        ticketDesc: "Tickets desc will go here",
        ticketCreated: ticketId.timestamp,
        detail: detailsArray
        }
    });
    }
}



module.exports = {
    loadDetailsPage,
    renderNewDetailsAfterSubmission
}