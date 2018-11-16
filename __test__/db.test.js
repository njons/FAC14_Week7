// const test = require("tape");
const dbBuild = require("../src/db/test_db/test_db_build");
const getUserInfo = require("../src/queries/getUserInfo");
// const addData = require("../src/queries/addData");

test("Jest is working", () => {
  expect(1).toBe(1);
});

describe("getting all users", () => {
  test("get all users from db", () => {
    // expect.assertions(1);
    // return getUserInfo().then(res => {
    //   console.log(res);
    //   expect(res).toBeTruthy();
    // });
    console.log(getUserInfo);
  });
  // test("returns our test user", () => {
  //   expect.assertions(1);
  //   return queries.getUsers().then(res => {
  //     expect(res[1].email).toBe("user@test.com");
  //   });
  // });
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
