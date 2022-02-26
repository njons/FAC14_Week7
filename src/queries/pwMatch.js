import dbConnection from "../db/db_connection.cjs";
import bcryptjs from "bcryptjs";
import getUserId from "./getUserId.js";

const pwMatch = async (username, password) => {
  // get hashed password that belongs to username
  const sql = {
    text: `SELECT password, id FROM users WHERE username = $1;`,
    values: [username],
  };
  dbConnection
    .query(sql)
    .then(async (value) => {
      const hashedPassword = await value.rows[0].password;
      // use bcrypt to compare the stored password with the input password
      return bcryptjs.compare(password, hashedPassword);
      // console.error("dbResult", dbResult);
      // return dbResult;
      //=> {
      //   // if pws match get the userId (for cookie) else return false
      //   return dbResult;
      //   const
      //   // cb(null, dbResult);
      // });
    })
    .catch((err) => {
      console.error("error", err.constraint);
      if (err) return cb(err);
    });
};

export default pwMatch;
