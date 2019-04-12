// Bring in the databse connection.
const db = require("./conn");
const bcrpyt = require("bcryptjs");

// Need a User class.
// Classes should start with an uppercase letter

class AllTickets {
  constructor(id, issue_desc) {

    this.id = id;
    this.issueDesc = issue_desc;
    // this.notes_id = notes_id;
    // this.TIMESTAMP = TIMESTAMP;
    // this.status 
  }

static getAll() {
    return db.any(`select * from all_tickets`)
    .then((arrayOfTickets) => {
        console.log(arrayOfTickets);
        return arrayOfTickets
    });
}

static newIssueSubmitted(issue_desc) {
  const timestamp = new Date();
  const month = timestamp.getMonth() + 1;
  const realMonth = month.toString();
  const date = timestamp.getDate().toString();
  const year = timestamp.getFullYear().toString();
  const entireDate = `${realMonth}/ ${date}/ ${year}`
  return db.none(`insert into all_tickets (issue_desc, time_posted)
                  values ('${issue_desc}', '${entireDate}')`)
          ;
      }


}

module.exports = AllTickets;
