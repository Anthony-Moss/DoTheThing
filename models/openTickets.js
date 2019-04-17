// Bring in the databse connection.
const db = require("./conn");

class OpenTickets {
  constructor(id, all_tickets_id, ticket_status) {
    this.id = id;
    this.allTicketsId = all_tickets_id;
    this.ticket_status = ticket_status;
  }

  static getAll() {
    return db.any(`select * from open_tickets`).then(arrayOfTickets => {
      return arrayOfTickets;
    });
  }

  static getByAllTicketsId() {
    return db.any(`select * from open_tickets o inner join all_tickets a on o.all_tickets_id=a.id`)
      .then(arrayOfOpenTicketsData => {
        return arrayOfOpenTicketsData;
      });
  }

  static getOneByAllTicketsId(id) {
    return db.one(`select * from all_tickets a inner join open_tickets o on a.id=o.all_tickets_id`)
      .then((ticketData) => {
        return ticketData
      });
  }
}

module.exports = OpenTickets;
