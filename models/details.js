const db = require("./conn");

class Details {
  constructor(id, note_content) {
    this.id = id;
    this.note_content = note_content;
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
    const timestamp = new Date();
    const month = timestamp.getMonth() + 1;
    const realMonth = month.toString();
    const date = timestamp.getDate().toString();
    const year = timestamp.getFullYear().toString();
    const hour = timestamp.getHours().toString();
    const minute = timestamp.getMinutes().toString();
    const second = timestamp.getSeconds().toString();
    const entireDate = `${realMonth}/${date}/${year}
                        ${hour}:${minute}:${second}`
    return db.none('insert into notes (note_content, users_id, all_tickets_id, time_posted) values ($1, $2, $3, $4)', [notecontent, users_id, all_tickets_id, entireDate]); 
  }

  // Function that will select by id
  //   static getDetailById(id) {
  //     return db.one(`select `)
  //   }
}

module.exports = Details;
