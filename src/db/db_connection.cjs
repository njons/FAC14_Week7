const { Pool } = require("pg");
const url = require("url");
require("env2")("config.env");

let DB_URL = process.env.DB_URL;

// if the test script is run, use the test env variable
if (process.env.NODE_ENV === "test") {
  DB_URL = process.env.TERST_DB_URL;
}

// make sure there is a DB_URL
if (!process.env.DB_URL) throw new Error("DB_URL must be set");

// break down the DB_URL into params to populate the options object
const params = url.parse(process.env.DB_URL);
const [username, password] = params.auth.split(":");

// fill the options object with info importnat to establish a connection with the db
const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  max: process.env.DB_URL_CONNECTIONS || 2,
  user: username,
  password,
  // connectionTimeoutMillis: 2000,
  ssl: params.hostname !== "localhost",
  // ssl: { rejectUnauthorized: false },
};

module.exports = new Pool(options);
