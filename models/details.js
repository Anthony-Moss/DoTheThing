const db = require("./conn");

class Details {
  constructor(id, note_content) {
    this.id = id;
    this.note_content = note_content;
    // this.users_id = users_id;
    // this.all_tickets_id = all_tickets_id;
  }

  static getAll() {
    return db.any(`select * from notes`).then(arrayOfNotes => {
      console.log(arrayOfNotes);
      return arrayOfNotes;
    });
  }

  static getNotesByTicketId(ticketId) {
    return db.any('select * from notes where all_tickets_id = $1', [parseInt(ticketId)]).then(arrayOfNotes => {
        console.log(arrayOfNotes);
        return arrayOfNotes;
      });
  }
  // Should we add a time posted for notes as well?

  static newDetailSubmitted(notecontent, users_id, all_tickets_id) {
    return db.none('insert into notes (note_content, users_id, all_tickets_id) values ($1, $2, $3)', 
    [notecontent, users_id, all_tickets_id]);
  }

  // Function that will select by id
  //   static getDetailById(id) {
  //     return db.one(`select `)
  //   }
}

module.exports = Details;
