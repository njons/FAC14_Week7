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

describe("Test the publicRoute, serving files", () => {
  test("Returns with status code 200", done => {
    supertest(router)
      .get("/public/css/style.css")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test(".css files returns css", done => {
    supertest(router)
      .get("/public/css/style.css")
      .then(response => {
        expect(response.res.statusMessage).toBe("Content-type: text/css");
        expect(response.res.text.charAt(0)).toBe("*");
        done();
      });
  });
  test(".js files returns javascript", done => {
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
  test("font file returns .ttf", done => {
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
});

describe("Test the login route", () => {
  test("the /login returns a status code of 200 ", done => {
    supertest(router)
      .get("/login")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
//
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

describe("Test the register route", () => {
  test("the /register returns a status code of 200 ", done => {
    supertest(router)
      .post("/register")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

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

describe("Test the welcome route", () => {
  test("the /welcome returns a status code of 200 ", done => {
    supertest(router)
      .get("/welcome")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the welcome data route", () => {
  test("the /user-data returns a status code of 302 ", done => {
    supertest(router)
      .get("/user-data")
      .then(response => {
        expect(response.statusCode).toBe(302);
        done();
      });
  });
});

describe("Test the logout data route", () => {
  test("the /logout returns a status code of 302 ", done => {
    supertest(router)
      .get("/logout")
      .then(response => {
        console.log(response);
        expect(response.statusCode).toBe(302);
        done();
      });
  });
});

// // PAGE: this is where we are serving the login files
// homeRoute(request, response, url);
// } else if (url.includes("/public")) {
// publicRoute(request, response, url);
// } else if (url.includes("/login")) {
// // PAGE: this is where we are serving the login files
// loginRoute(request, response, url);
// } else if (url.includes("/verify-login")) {
// verifyLoginRoute(request, response, url);
// } else if (url.includes("/register")) {
// // PAGE: this is where we are serving the register files
// registerRoute(request, response, url);
// } else if (url.includes("/save-registry")) {
// saveRegistryRoute(request, response, url);
// } else if (url.includes("/welcome")) {
// // PAGE: this is where we are serving the welcome files
// welcomeRoute(request, response, url);
// } else if (url.includes("/user-data")) {
// // ACTION: on welcome (grab colour from the)
// welcomeDataRoute(request, response, url);
// } else if (url.includes("/logout")) {
// // ACTION: on logout (reroute to login and destroy cookie)
// logoutRoute(request, response, url);
