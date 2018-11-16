// const test = require("tape");
const dbBuild = require("../src/db/test_db/test_db_build");

// const getData = require("../src/queries/getData");
// const addData = require("../src/queries/addData");

test("Jest is working", () => {
  expect(1).toBe(1);
});

test("testing bdBuild", done => {
  function callback(data) {
    // console.log(data);
    expect(data).toBe(null);
    done();
  }

  dbBuild(callback);
});
// console.log(dbBuild);
// .get(dbBuild)
// .then(response => {
//   console.log('this is from db:', response);
//   done();
// });
// expect(typeof dbBuild).toBe("function");
// });

// test(`tape is working`, t => {
//   t.equal(1, 1, `should return 1`);
//   t.end();
// });
//
// test(`error is null when db is filled`, t => {
//   dbBuild((err, data) => {
//     t.equal(err, null, `err is null`);
//     t.end();
//   });
// });
//
// test(``, t => {
//   dbBuild((err, data) => {
//     t.
//   })
// })
