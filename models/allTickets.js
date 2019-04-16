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
    return db.none(`insert into all_tickets (issue_desc, time_posted, ticket_status)
                  values ('${issue_desc}', '${entireDate}', 0)`);
  }



static getTicketInfoByIssue(issueDesc) {
  return db.one('select * from all_tickets a inner join open_tickets o on a.id = o.all_tickets_id where a.issue_desc = $1', [issueDesc])
  .then((ticketData) => {
    return ticketData;
  });
}

static getTicketInfo(id) {
  return db.one('select * from all_tickets t where t.id = $1', [parseInt(id)])
  .then((ticketData) => {
    console.log(ticketData);
    return ticketData;
  });
}


static moveToOpen(allTicketsId, usersId) {
  return db.none(`insert into open_tickets (all_tickets_id, users_id)
  values ('${allTicketsId}', '${usersId}')`);
}

  // Will probably need to make seperate functions for each open, pending and completed tickets because they are all different so we can get details no matter
  // what status the ticket is in
  static getTicketInfoByIdIfOpen() {
    return db.one('select * from all_tickets a inner join open_tickets o on a.id = o.all_tickets_id')
      .then((ticketData) => {
        return ticketData;
      });
  }

  // CHANGE STATUS TO 'PENDING'
 static async updateToPending(id){
  return await db.none('UPDATE all_tickets SET ticket_status = 1 WHERE id = $1', [id])
  }

  static async updateToCompleted(id){
    return await db.none('UPDATE all_tickets SET ticket_status = 2 WHERE id = $1', [id])
    }

  static getOpenTickets(ticket_status) {
    return db.any('select * from all_tickets where ticket_status = $1', [ticket_status])
      .then((ticketData) => {
        console.log(ticketData)
        return ticketData;
      });
  }

}

module.exports = AllTickets;
