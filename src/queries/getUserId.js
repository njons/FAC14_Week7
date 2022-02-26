import dbConnection from "../db/db_connection.cjs";

const getUserId = async (username, cb) => {
  // console.log("this is username in get user id:", username);
  const sql = {
    text: `SELECT id FROM users WHERE username=$1;`,
    values: [username],
  };
  dbConnection
    .query(sql)
    .then((value) => {
      const user = value.rows[0];
      cb(null, user.id);
    })
    .catch((err) => {
      console.error("error", err.constraint);
      if (err) return cb(err);
    });
};

export default getUserId;
