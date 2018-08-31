const test = require("tape");
const dbBuild = require("../src/db/test_db/test_db_build");

// const getData = require("../src/queries/getData");
// const addData = require("../src/queries/addData");

test(`tape is working`, t => {
  t.equal(1, 1, `should return 1`);
  t.end();
});

test(`error is null when db is filled`, t => {
  dbBuild((err, data) => {
    t.equal(err, null, `err is null`);
    t.end();
  });
});
