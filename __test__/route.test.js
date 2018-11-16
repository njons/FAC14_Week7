// const test = require("tape");
const supertest = require("supertest");
const router = require("../src/router");
// test("Jest is working", () => {
//   expect(1).toBe(1);
// });

describe("Test the home GET route", () => {
  test("Returns with status code 200", done => {
    supertest(router)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("Returns html", done => {
    supertest(router)
      .get("/")
      .then(response => {
        expect(response.header["content-type"]).toBe("text/html");
        expect(response.res.text.charAt(0)).toBe("<");
        done();
      });
  });
});

describe("Test the routes, serving files", () => {
  test("public files (css): status code 200, correct MIME type and serves css", done => {
    supertest(router)
      .get("/public/css/style.css")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.res.statusMessage).toBe("Content-type: text/css");
        expect(response.res.text.charAt(0)).toBe("*");
        done();
      });
  });
  test("public files (js): status code 200, correct MIME type and serves javascript", done => {
    supertest(router)
      .get("/public/js/dom.js")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.res.statusMessage).toBe(
          "Content-type: application/javascript"
        );
        expect(response.res.text.charAt(0)).toBe("c");
        done();
      });
  });
  test("public files (font): status code 200 and correct MIME type", done => {
    supertest(router)
      .get("/public/css/font/InputMono-Bold.ttf")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.res.statusMessage).toBe(
          "Content-type: application/octet-stream"
        );
        done();
      });
  });
  test("register page: status code of 200, correct MIME type and serves html", done => {
    supertest(router)
      .get("/register")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.header["content-type"]).toBe("text/html");
        expect(response.res.text.charAt(0)).toBe("<");
        done();
      });
  });
  test("login page: status code of 200, correct MIME type and serves html", done => {
    supertest(router)
      .get("/login")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.header["content-type"]).toBe("text/html");
        expect(response.res.text.charAt(0)).toBe("<");
        done();
      });
  });
  test("welcome page: status code of 200, correct MIME type and serves html", done => {
    supertest(router)
      .get("/welcome")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.header["content-type"]).toBe("text/html");
        expect(response.res.text.charAt(0)).toBe("<");
        done();
      });
  });
});

describe("Test rerouting", () => {
  test("user-data route (if no cookie): status code of 302 and reroutes to the home", done => {
    supertest(router)
      .get("/user-data")
      .then(response => {
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe("/");
        done();
      });
  });
  test("logout route: status code of 302 and reroutes to the home page", done => {
    supertest(router)
      .get("/logout")
      .then(response => {
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe("/");
        done();
      });
  });
  test("logout route: contains instructions for cookie that destroys the cookie", done => {
    supertest(router)
      .get("/logout")
      .then(response => {
        expect(typeof response.headers["set-cookie"]).toBe("object");
        expect(response.headers["set-cookie"][0].slice(10, 19)).toBe(
          "Max-Age=0"
        );
        done();
      });
  });
});

// verify login (gets stuck in validation function - because details are undefined?)

// describe("Test the verify login route", () => {
//   test("the /verify-login returns a status code of 200 ", done => {
//     supertest(router)
//       .post("/verify-login")
//       .then(response => {
//         // console.log(response);
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//   });
// });

// save registry (gets stuck in validation function - because details are undefined?)

// describe("Test saving the registry route", () => {
//   test("the /save-registry returns a status code of 200 ", done => {
//     supertest(router)
//       .post("/save-registry")
//       .then(response => {
//         console.log(response);
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//   });
// });
