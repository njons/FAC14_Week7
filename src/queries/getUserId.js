const dbConnection = require("../db/db_connection");

const getUserId = (username, cb) => {
  console.log("(getUserInfo) this is username:", username);
  // get the username and colour
  dbConnection.query(
    `SELECT id FROM users WHERE username=$1`,
    [username],
    (err, dbResults) => {
      if (err) return cb(err);
      cb(null, dbResults.rows[0].id);
      console.log("(getUserInfo) this is db Results:", dbResults);
    }
  );
};

module.exports = getUserId;
