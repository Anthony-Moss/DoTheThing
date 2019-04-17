// Bring in the databse connection.
const db = require("./conn");
const bcrpyt = require("bcryptjs");
const escapeHtml = require("../utils");

// Need a User class.
// Classes should start with an uppercase letter
class User {
  constructor(id, first_name, last_name, email, password) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }
  static delete(id) {
    return db.result("delete from users where id=$1", [id]);
  }

  static hashPass(newPassword) {
    const salt = bcrpyt.genSaltSync(10);
    const hash = bcrpyt.hashSync(newPassword, salt);
    return hash;
  }

  static add(userData) {
    //do an insert into the database
    // not using ${} because I dont want to interpolate
    // using $() so that pg-promise does *safe* interpolation
    const firstName = escapeHtml(userData.first_name);
    const lastName = escapeHtml(userData.last_name);
    const email = escapeHtml(userData.email);
    const aPassword = escapeHtml(userData.password);
    const hashed = User.hashPass(aPassword);
    return db
      .one(`
        insert into users 
    (first_name, last_name, email, password) 
    values 
    ($1, $2, $3, $4)
    returning id, first_name, last_name`,
        [firstName, lastName, email, hashed]
      )
      .then(data => {
        return data.id;
      });
    }

  static getById(id) {
    return db
      .one(`select * from users where id=${id}`)
      .then(userData => {
        const userInstance = new User(
          userData.id,
          userData.first_name,
          userData.last_name,
          userData.email,
          userData.password
        );
        return userInstance;
      })
      .catch(() => {
        return null;
      });
    }
  static getAll() {
    return db.any(`select * from users`).then(arrayOfUsers => {
      return arrayOfUsers.map(userData => {
        const aUser = new User(
          userData.id,
          userData.first_name,
          userData.last_name,
          userData.email,
          userData.password
        );
        return aUser;
      });
    });
  }
  save() {
    return db.result(
      `update users set first_name='${this.first_name}', last_name='${this.last_name}',
      email='${this.email}', password='${this.password}' where id=${
      this.id
      } `
    );
  }

  checkPassword(aPassword) {
    return bcrpyt.compareSync(aPassword, this.password);
  }

  setPassword(newPassword) {
    const salt = bcrpyt.genSaltSync(10);
    const hash = bcrpyt.hashSync(newPassword, salt);
    this.password = hash;
  }

  static getByEmail(email) {
    return db
      .one(`select * from users where email=$1`, [email])
      .then(userData => {
        const aUser = new User(
          userData.id,
          userData.first_name,
          userData.last_name,
          userData.email,
          userData.password
        );
        console.log(`You created a new account with the email ${userData.email}!`);
        return aUser;
      });
  }

  static checkEmail(userData) {
    const aEmail = escapeHtml(userData.email);
    return db.one(`select email from users where email=$1`, [aEmail]) // returns the email of user instance if one exists with that email
      .catch(() => {
        return userData; //signals that email is not in database so we can create new user
      });
  }

}

// async function demo() {
//   const user = await User.getByEmail("am123@me.com");
//   user.setPassword("waffles");
//   await user.save();
//   console.log("you did the thing");
// }
// demo();
module.exports = User;
