const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");

const verifyLogin = require("./queries/login");
const register = require("./queries/register");

const key = "jaffa";

const homeRoute = (request, response) => {
  fs.readFile(
    path.join(__dirname, "..", "public", "index.html"),
    (err, file) => {
      if (err) {
        response.writeHead(500, { "Content-type": "text/html" });
        response.end("<h1>Woops womething webt wrong</h1>");
      } else {
        response.writeHead(200, { "Content-type": "text/html" });
        response.end(file);
      }
    }
  );
};

const publicRoute = (request, response, url) => {
  const ext = url.split(".")[1];
  const fileExt = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    json: "application/json",
    ttf: "application/octet-stream"
  };

  fs.readFile(path.join(__dirname, "..", url), (err, file) => {
    if (err) {
      response.writeHead(500, { "Content-type": "text/html" });
      response.end("<h1>Woops womething webt wrong</h1>");
    } else {
      response.writeHead(200, `Content-type: ${ext[fileExt]}`);
      response.end(file);
    }
  });
};

const loginRoute = (request, response, url) => {
  // console.log("this is url", url);
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const username = querystring.parse(data).username;
    const password = querystring.parse(data).password;

    if (data) {
      verifyLogin(username, password, (err, data) => {
        if (err) {
          response.writeHead(500, { "content-type": "html/text" });
          response.end("<h1>error updating the database</h1>");
        } else if (data) {
          console.log("bang:", data);
          const payload = { logged_in: true, username: data };
          const options = { expiresIn: "30d" };
          const token = jwt.sign(payload, key, options);
          response.writeHead(302, {
            location: "/",
            "Set-Cookie": `status=true; HttpOnly`
          });
          response.end();
        } else {
          response.writeHead(302, {
            location: "/",
            "Set-Cookie": "status=0; Max-Age=0"
          });
          response.end();
        }
      });
    }
  });
};

const registerRoute = (request, response, url) => {
  console.log("this is url", url);
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    console.log("(handler) this is data back from register:", data);
    const username = querystring.parse(data).username;
    const password = querystring.parse(data).password;
    const colour = querystring.parse(data).color;
    if (data) {
      register(username, password, colour, (err, username) => {
        if (err) {
          response.writeHead(500, { "content-type": "html/text" });
          response.end("<h1>Woops womething went wrong</h1>");
        } else {
          console.log("bong:", username);
          const payload = {
            logged_in: true,
            user_name: username
          };
          const options = { expiresIn: "30d" };
          const token = jwt.sign(payload, key, options);
          response.writeHead(302, {
            location: "/",
            "Set-Cookie": `status=${token}; HttpOnly`
          });
          response.end();
        }
      });
    }
  });

  fs.readFile(
    path.join(__dirname, "..", "public", "register.html"),
    (err, file) => {
      if (err) {
        response.writeHead(500, { "Content-type": "text/html" });
        response.end("<h1>Woops womething webt wrong</h1>");
      } else {
        response.writeHead(200, { "Content-type": "text/html" });
        response.end(file);
      }
    }
  );
};

const logoutRoute = (request, response, url) => {};

module.exports = {
  homeRoute,
  publicRoute,
  loginRoute,
  registerRoute,
  logoutRoute
};
