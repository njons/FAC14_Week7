import dbConnection from "../db/db_connection.cjs";
import bcryptjs from "bcryptjs";

const pwMatch = async (username, password) => {
  // get hashed password that belongs to username
  const sql = {
    text: `SELECT password, id FROM users WHERE username = $1;`,
    values: [username],
  };
  return dbConnection
    .query(sql)
    .then(async (value) => {
      const hashedPassword = await value.rows[0].password;
      // use bcrypt to compare the stored password with the input password
      return await bcryptjs
        .compare(password, hashedPassword)
        .then((value) => value)
        .catch((error) => error);
    })
    .catch((err) => {
      console.error("error", err.constraint);
    });
};

export default pwMatch;
