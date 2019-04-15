// Bring in the databse connection.
const db = require("./conn");
const bcrpyt = require("bcryptjs");

// Need a User class.
// Classes should start with an uppercase letter
class PendingTickets {
  constructor(id, all_tickets_id, users_id, time_started) {
    this.id = id;
    this.all_tickets_id = all_tickets_id;
    this.users_id = users_id;
    this.time_started = time_started;
  }

  static getAll() {
    return db.any(`select * from pending_tickets`).then(arrayOfTickets => {
      console.log(arrayOfTickets);
      return arrayOfTickets;
    });
  }

  static getByAllTicketsId() {
    return db.any(`select p.*, a.issue_desc, a.time_posted from pending_tickets p inner join all_tickets a on p.all_tickets_id=a.id`)
      .then(arrayOfPendingTicketsData => {
        return arrayOfPendingTicketsData;
      });
  }

  static getAllTicketsIdOfPendingTicket(id) {
    return db.one(`select all_tickets_id from pending_tickets where id=${id}`)
    .then((ticketId) => {
      return ticketId;
    });
  }
}

module.exports = PendingTickets;


