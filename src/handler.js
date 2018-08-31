const fs = require("fs");
const path = require("path");

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

const loginRoute = (request, response, url) => {};

const registerRoute = (request, response, url) => {};

const logoutRoute = (request, response, url) => {};

module.exports = { homeRoute, publicRoute loginRoute, registerRoute, logoutRoute};
