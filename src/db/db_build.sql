BEGIN;

-- to generate new database at each test
DROP TABLE IF EXISTS users CASCADE;

-- create table users to collect password and user name and color
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  colour VARCHAR(9) NOT NULL
);

COMMIT;
