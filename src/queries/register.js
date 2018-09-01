const dbConnection = require("../db/db_connection");
const bcryptjs = require("bcryptjs");

const register = (username, password, colour, cb) => {
  console.log("this is the username reaching the sql query", username);
  console.log("this is the password reaching the sql query", password);
  console.log("this is the colour reaching the sql query", colour);
  // hash the password
  bcryptjs.hash(password, 10, (err, hashPassword) => {
    // commit the information to the database
    dbConnection.query(
      `INSERT INTO users (username, password, colour) VALUES ($1, $2, $3);`,
      [username, hashPassword, colour],
      (err, dbResults) => {
        // console.log("this is dbResults", dbResults);
        // console.log(cb());
        // if (err) return cb(err);
        // ask the database for the id of the curent user so it can be adedd to the cookie
        dbConnection.query(
          `SELECT id FROM users WHERE username=$1;`,
          [username],
          (err, userId) => {
            console.log("(register) this is userId", userId);
            cb(null, userId);
          }
        );
      }
    );
  });
};

module.exports = register;
