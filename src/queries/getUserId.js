import dbConnection from "../db/db_connection.cjs";

const getUserId = async (username, cb) => {
  const sql = {
    text: `SELECT id FROM users WHERE username=$1;`,
    values: [username],
  };
  return dbConnection
    .query(sql)
    .then((value) => {
      const user = value.rows[0];
      return user;
    })
    .catch((err) => {
      console.error("error", err.constraint);
      console.error("error", err);
      return err;
    });
};

export default getUserId;
