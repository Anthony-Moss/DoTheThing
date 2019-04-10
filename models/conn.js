const pgp = require("pg-promise")({
  query: e => {
    console.log("QUERY: ", e.query);
  }
});
const options = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
};

//make a connection to the database specified by the options object
const db = pgp(options);
module.exports = db;
