// what code do we need to access?
const { homeRoute, publicRoute } = require("./handler");

const router = (request, response) => {
  console.log("this is the current url:", request.url);

  const url = request.url;

  if (url === "/") {
    homeRoute(request, response);
  } else if (url.includes("/public")) {
    publicRoute(request, response, url);
  } else {
    response.writeHead(404, "Content-Type: text/html");
    response.end("<h1>404 not found</h1>");
  }
};
module.exports = router;