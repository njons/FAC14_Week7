const dbConnection = require("../db/db_connection");
const bcryptjs = require("bcryptjs");

const verifyLogin = (username, password, cb) => {
  console.log("this is username:", username);
  // ask db for the hashed password that belongs to the unique username (to match with the input)
  dbConnection.query(
    `SELECT password FROM users WHERE username = $1;`,
    [username],
    (err, dbResult) => {
      console.log(
        "(login) this the hashed password (in verifyLogin):",
        dbResult
      );
      // console.log(
      //   "(login) this the hashed password (in verifyLogin):",
      //   dbResult.rows[0].password
      // );
      if (err) return cb(err);
      // use bcrypt to compare the hased password (dbResult) with the input (password)
      bcryptjs.compare(
        password,
        dbResult.rows[0].password,
        (err, checkedPw) => {
          if (err) return cb(err);
          // if there is a match
          if (checkedPw) {
            // return the id of the user to the router to be placed in the cookie
            cb(null, checkedPw);
          } else {
            // if the two do not match
            cb(null, false);
          }
        }
      );
    }
  );
};

module.exports = verifyLogin;
