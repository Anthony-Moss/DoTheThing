// Bring in the databse connection.
const db = require("./conn");
const bcrpyt = require("bcryptjs");

// Need a User class.
// Classes should start with an uppercase letter
class CompletedTickets {
  constructor(id, all_tickets_id, users_id, time_ended) {
    this.id = id;
    this.all_tickets_id = all_tickets_id;
    this.users_id = users_id;
    this.time_ended = time_ended;
  }

  static getAll() {
    return db.any(`select * from completed_tickets`).then(arrayOfTickets => {
      console.log(arrayOfTickets);
      return arrayOfTickets;
    });
  }

  static getByAllTicketsId() {
    return db
      .any(`select * from completed_tickets c inner join all_tickets a on c.all_tickets_id=a.id`)
      .then(arrayOfCompletedTicketsData => {
        return arrayOfCompletedTicketsData;
      });
  }
}

module.exports = CompletedTickets;
