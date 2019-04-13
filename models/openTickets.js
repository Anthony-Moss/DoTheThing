// Bring in the databse connection.
const db = require("./conn");
const bcrpyt = require("bcryptjs");

// Need a User class.
// Classes should start with an uppercase letter
class OpenTickets {
  constructor(id, all_tickets_id) {
    this.id = id;
    this.allTicketsId = all_tickets_id;
    // this.notes_id = notes_id;
    //this.timePosted = time_posted;
    // this.pending_tickets_id = pending_tickets_id;
    // this.completed_tickets_id = completed_tickets_id;
  }

  static getAll() {
    return db.any(`select * from open_tickets`).then(arrayOfTickets => {
      console.log(arrayOfTickets);
      return arrayOfTickets;
    });
  }

  static getByAllTicketsId() {
    return db
      .any(
        `select * from open_tickets o inner join all_tickets a on o.all_tickets_id=a.id`
      )
      .then(arrayOfOpenTicketsData => {
        return arrayOfOpenTicketsData;
      });
  }

  static getOneByAllTicketsId(id) {
    return db.one(`select * from all_tickets a inner join open_tickets o on a.id=o.all_tickets_id`)
    .then((ticketData) => {
      return ticketData
    })
  }
}

module.exports = OpenTickets;
