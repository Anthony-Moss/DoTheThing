
const db = require("./conn");

class Details {
  constructor(id, note_content, users_id, all_tickets_id) {
    this.id = id;
    this.note_content = note_content;
    this.users_id = users_id;
    this.all_tickets_id = all_tickets_id;
  }

  static getAll() {
    return db.any(`select * from notes`).then(arrayOfNotes => {
      console.log(arrayOfNotes);
      return arrayOfNotes;
    });
  }

  static getByAllTicketsId() {
    return db
      .any(`select * from completed_tickets`)
      .then(arrayOfCompletedTicketsData => {
        return arrayOfCompletedTicketsData;
      });
  }
}

module.exports = Details;
