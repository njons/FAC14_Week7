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

INSERT INTO users (username, password, colour) VALUES
('njons', '$2a$10$I981Qnex5kQ6bhS.IkqmFeFMoAj5FIIIyd/84kGlCg0xi0EZ8vPn.', '#123456'),
('mjons', '$2a$10$I981Qnex5kQ6bhS.IkqmFeFMoAj5FIIIyd/84kGlCg0xi0EZ8vPn.', '#654321'),
('ojons', '$2a$10$I981Qnex5kQ6bhS.IkqmFeFMoAj5FIIIyd/84kGlCg0xi0EZ8vPn.', '#ABCDEF'),
('pjons', '$2a$10$I981Qnex5kQ6bhS.IkqmFeFMoAj5FIIIyd/84kGlCg0xi0EZ8vPn.', '#FEDCBA'),
('qjons', '$2a$10$I981Qnex5kQ6bhS.IkqmFeFMoAj5FIIIyd/84kGlCg0xi0EZ8vPn.', '#000000');


COMMIT;


-- apple = $2a$10$I981Qnex5kQ6bhS.IkqmFeFMoAj5FIIIyd/84kGlCg0xi0EZ8vPn.
