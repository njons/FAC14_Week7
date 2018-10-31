const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const verifyLogin = require("./queries/verifyLogin");
const register = require("./queries/register");
const getUserInfo = require("./queries/getUserInfo");
const getUserId = require("./queries/getUserId");

const key = "jaffa";

const readFile = (response, filename) => {
  fs.readFile(path.join(__dirname, "..", "public", filename), (err, file) => {
    if (err) {
      response.writeHead(500, { "Content-type": "text/html" });
      response.end("<h1>Woops womething webt wrong</h1>");
    } else {
      response.writeHead(200, { "Content-type": "text/html" });
      response.end(file);
    }
  });
};

const makeCookie = (loggedIn, userId) => {
  console.log("this is the Id in the cookie:", userId);
  const payload = {
    logged_in: loggedIn,
    user_id: userId
  };
  const options = { expiresIn: "30d" };
  return jwt.sign(payload, key, options);
};

const validateName = name => {
  const lowerCaseName = name.toLowerCase();
  return lowerCaseName.replace(/\s/g, "");
};

const validatePwd = pwd => {
  return pwd.trim();
};

const homeRoute = (request, response) => {
  readFile(response, "index.html");
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

const registerRoute = (request, response, url) => {
  readFile(response, "register.html");
};

const loginRoute = (request, response, url) => {
  readFile(response, "index.html");
};

const welcomeRoute = (request, response, url) => {
  readFile(response, "welcome.html");
};

const verifyLoginRoute = (request, response, url) => {
  console.log("this is url", url);
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const username = validateName(querystring.parse(data).username);
    console.log("this is username:", username);
    const password = validatePwd(querystring.parse(data).password);
    console.log("this is password:", password);
    if (username.length === 0) {
      return "username is empty";
    } else if (password.length === 0) {
      return "password is empty";
    } else {
      if (data) {
        verifyLogin(username, password, (err, data) => {
          if (err) {
            response.writeHead(500, { "content-type": "html/text" });
            response.end("<h1>error updating the database</h1>");
          } else if (data) {
            console.log("(handler) bang:", data);
            getUserId(username, (err, userId) => {
              if (err) console.log(err);
              if (data) {
                const token = makeCookie(data, userId);
                response.writeHead(302, {
                  location: "/welcome",
                  "Set-Cookie": `status=${token}; HttpOnly`
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
      }
    }
  });
};

const saveRegistryRoute = (request, response, url) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    console.log("(handler) this is data back from register:", data);
    const username = validateName(querystring.parse(data).username);
    console.log(username);
    const password = validatePwd(querystring.parse(data).password);
    const colour = querystring.parse(data).color;
    if (data) {
      register(username, password, colour, (err, userId) => {
        // console.log("(handler) this is userId:", userId);
        if (err) {
          response.writeHead(500, { "content-type": "html/text" });
          response.end("<h1>Woops womething went wrong</h1>");
        } else if (userId) {
          console.log("(handler) this is userid from register:", userId);
          const token = makeCookie(true, userId.rows[0].id);
          response.writeHead(302, {
            location: "/welcome",
            "Set-Cookie": `status=${token}; HttpOnly`
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

const welcomeDataRoute = (request, response, url) => {
  console.log(url);
  // check if there is a cookie
  console.log("(handler) this is the request:", request.headers.cookie);
  if (request.headers.cookie && request.headers.cookie.includes("status")) {
    // use the module cookie to parse the information in the cookie
    const cookies = cookie.parse(request.headers.cookie);
    console.log("(handler) this is cookie:", cookie);
    // use the module jsonwebtoken to verify the infomatin in the cookie
    jwt.verify(cookies.status, key, (err, decoded) => {
      console.log("(handler) this is decoded:", decoded);
      console.log("(handler) this is decoded.id:", decoded.user_id);
      getUserInfo(decoded.user_id, (err, userInfo) => {
        if (err) console.log(err);
        // console.log("hi ", userInfo.rows[0].username);
        // console.log("you like ", userInfo.rows[0].colour);
        const returnObj = {
          username: userInfo.rows[0].username,
          colour: userInfo.rows[0].colour,
          user_id: decoded.user_id,
          logged_in: decoded.logged_in
        };
        console.log("returnObj:", returnObj);
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(returnObj));
      });
    });
  } else {
    response.writeHead(302, {
      Location: "/",
      "Set-Cookie": "logged_in=0; Max-Age=0"
    });
    response.end();
  }
};

const logoutRoute = (request, response, url) => {
  response.writeHead(302, {
    location: "/",
    "Set-Cookie": "status=0; Max-Age=0"
  });
  response.end();
};

module.exports = {
  homeRoute,
  publicRoute,
  loginRoute,
  verifyLoginRoute,
  registerRoute,
  saveRegistryRoute,
  welcomeRoute,
  welcomeDataRoute,
  logoutRoute
};
