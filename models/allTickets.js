// Bring in the databse connection.
const db = require("./conn");
const bcrpyt = require("bcryptjs");

// Need a User class.
// Classes should start with an uppercase letter

class AllTickets {
  constructor(id, issue_desc) {

    this.id = id;
    this.issueDesc = issue_desc;
  }

  static getAll() {
    return db.any(`select * from all_tickets`)
      .then((arrayOfTickets) => {
        return arrayOfTickets
      });
  }

  static newIssueSubmitted(issue_desc) {
    const timestamp = new Date();
    const month = timestamp.getMonth() + 1;
    const realMonth = month.toString();
    const date = timestamp.getDate().toString();
    const year = timestamp.getFullYear().toString();
    const entireDate = `${realMonth}/ ${date}/ ${year}`;
    const not = null;
    return db.none(`insert into all_tickets (issue_desc, time_posted, ticket_status, users_id)
                  values ('${issue_desc}', '${entireDate}', 0, null)`);
  }



// static getTicketInfoByIssue(issueDesc) {
//   return db.one('select * from all_tickets a inner join open_tickets o on a.id = o.all_tickets_id where a.issue_desc = $1', [issueDesc])
//   .then((ticketData) => {
//     return ticketData;
//   });
// }

static getTicketInfo(id) {
  return db.one('select * from all_tickets t where t.id = $1', [parseInt(id)])
  .then((ticketData) => {
    console.log(ticketData);
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

  static getTicketInfoByUserIdAndStatus(userId, ticket_status) {
    return db.any('select * from all_tickets where users_id = $1 and ticket_status = $2', [userId, ticket_status])
    .then((ticketData) => {
      return ticketData;
    });
  }

  static getTicketPendingTimestamp() {
  return db.any(`select p.*, a.issue_desc, a.time_posted from pending_tickets p inner join all_tickets a on p.all_tickets_id=a.id`)
  .then(arrayOfPendingTicketsData => {
    return arrayOfPendingTicketsData;
  });
}

}

module.exports = AllTickets;
