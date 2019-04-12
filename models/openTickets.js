const db = require("./conn");

// Bring in the databse connection.
const db = require("./conn");
const bcrpyt = require("bcryptjs");

// Need a User class.
// Classes should start with an uppercase letter

class OpenTickets {
  constructor(id, issue_desc, time_posted) {

    this.id = id;
    this.issueDesc = issue_desc;
    // this.notes_id = notes_id;
    this.timePosted = time_posted;
  }

static getAll() {
    return db.any(`select * from all_tickets`)
    .then((arrayOfTickets) => {
        return arrayOfTickets
    });
}

}

module.exports = OpenTickets;
