const fs = require("fs");
const dbConnection = require("./db_connection");

// start by reading the SQL file and converting it into a string
const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

// write the function to populate the database with the tables in the schema
const runDbBuild = cb => {
  dbConnection.query(sql, (err, data) => {
    if (err) cb(err);
    cb(null, data);
  });
};

module.exports = runDbBuild;
