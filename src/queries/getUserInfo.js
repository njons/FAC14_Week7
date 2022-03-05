//const dbConnection = require("../db/db_connection");
import dbConnection from "../db/db_connection.cjs";

// const getUserInfo = (id, cb) => {
//   console.log("(getUserInfo) this is id:", id);
//   // get the username and colour
//   dbConnection.query(
//     `SELECT username, colour FROM users WHERE id=$1`,
//     [id],
//     (err, dbResults) => {
//       if (err) return cb(err);
//       cb(null, dbResults);
//       console.log("(getUserInfo) this is db Results:", dbResults);
//     }
//   );
// };

const getUserInfo = async (id) => {
  // get hashed password that belongs to username
  const sql = {
    text: `SELECT username, colour FROM users WHERE id=$1`,
    values: [id],
  };
  return dbConnection
    .query(sql)
    .then(async (value) => {
      // console.log(value.rows[0]);
      const userData = await value.rows[0];
      return userData;
    })
    .catch((err) => {
      console.error("error", err.constraint);
    });
};

//module.exports = getUserInfo;
export default getUserInfo;
