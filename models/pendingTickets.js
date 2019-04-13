// Bring in the databse connection.
const db = require("./conn");
const bcrpyt = require("bcryptjs");

// Need a User class.
// Classes should start with an uppercase letter
class PendingTickets {
  constructor(id, pending_tickets_id) {
    this.id = id;
    this.pending_tickets_id = pending_tickets_id;
  }

  static getAll() {
    return db.any(`select * from pending_tickets`).then(arrayOfTickets => {
      console.log(arrayOfTickets);
      return arrayOfTickets;
    });
  }

  static getByAllTicketsId() {
    return db
      .any(
        `select * from pending_tickets o inner join all_tickets a on o.all_tickets_id=a.id`
      )
      .then(arrayOfPendingTicketsData => {
        return arrayOfPendingTicketsData;
      });
  }
}

module.exports = PendingTickets;
