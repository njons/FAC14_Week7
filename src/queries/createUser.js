import dbConnection from "../db/db_connection.cjs";
import bcryptjs from "bcryptjs";

const createUser = async (username, password, color, cb) => {
  // hash the password
  bcryptjs.hash(password, 10, (err, hashPassword) => {
    const sql = {
      text: `INSERT INTO users(username, password, colour) VALUES($1, $2, $3);`,
      values: [username, hashPassword, color],
    };
    dbConnection
      .query(sql)
      .then((value) => cb(null, value))
      .catch((err) => {
        console.error("error", err.constraint);
        if (err) return cb(err);
      });
  });
};

export default createUser;
