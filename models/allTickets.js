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
        // console.log(arrayOfTickets);
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


// Will probably need to make seperate functions for each open, pending and completed tickets because they are all different so we can get details no matter
// what status the ticket is in
static getTicketInfoByIdIfOpen() {
  return db.one('select * from all_tickets a inner join open_tickets o on a.id = o.all_tickets_id')
  .then((ticketData) => {
    return ticketData;
  });
}

static getTicketInfo(id) {
  return db.one('select * from all_tickets t where t.id = $1', [parseInt(id)])
  .then((ticketData) => {
    return ticketData;
  });
}

static moveToPending(allTicketsId, usersId) {
  // const timestamp = new Date();
  // const month = timestamp.getMonth() + 1;
  // const realMonth = month.toString();
  // const date = timestamp.getDate().toString();
  // const year = timestamp.getFullYear().toString();
  // const timeStarted = `${realMonth}/ ${date}/ ${year}`
  return db.none(`INSERT INTO pending_tickets 
  SELECT all_tickets_id
   FROM all_tickets
  WHERE id = $1'`, [allTicketsId, usersId])
}



// static getTicketInfoByIdIfPending(id) {
//   return db.one(`select * from all_tickets a inner join pending_tickets p on a.id = p.all_tickets_id where id = ${id}`)
//   .then((ticketData) => {
//     return ticketData;
//   });
// }

// static getTicketInfoByIdIfClosed(id) {
//   return db.one(`select * from all_tickets a inner join closed_tickets c on a.id = c.all_tickets_id where id = ${id}`)
//   .then((ticketData) => {
//     return ticketData;
//   });
// }

}

module.exports = AllTickets;
