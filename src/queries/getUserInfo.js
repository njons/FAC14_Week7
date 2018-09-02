const dbConnection = require("../db/db_connection");

const getUserInfo = (id, cb) => {
  console.log("(getUserInfo) this is id:", id);
  // get the username and colour
  dbConnection.query(
    `SELECT username, colour FROM users WHERE id=$1`,
    [id],
    (err, dbResults) => {
      if (err) return cb(err);
      cb(null, dbResults);
      console.log("(getUserInfo) this is db Results:", dbResults);
    }
  );
};

module.exports = getUserInfo;
