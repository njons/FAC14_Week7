// what code do we need to access?
const {
  homeRoute,
  publicRoute,
  loginRoute,
  verifyLoginRoute,
  registerRoute,
  saveRegistryRoute,
  welcomeRoute,
  welcomeDataRoute,
  logoutRoute
} = require("./handler");

const router = (request, response) => {
  console.log("this is the current url:", request.url);

  const url = request.url;

  if (url === "/") {
    // PAGE: this is where we are serving the login files
    homeRoute(request, response, url);
  } else if (url.includes("/public")) {
    publicRoute(request, response, url);
  } else if (url.includes("/login")) {
    // PAGE: this is where we are serving the login files
    loginRoute(request, response, url);
  } else if (url.includes("/verify-login")) {
    verifyLoginRoute(request, response, url);
  } else if (url.includes("/register")) {
    // PAGE: this is where we are serving the register files
    registerRoute(request, response, url);
  } else if (url.includes("/save-registry")) {
    saveRegistryRoute(request, response, url);
  } else if (url.includes("/welcome")) {
    // PAGE: this is where we are serving the welcome files
    welcomeRoute(request, response, url);
  } else if (url.includes("/user-data")) {
    // ACTION: on welcome (grab colour from the)
    welcomeDataRoute(request, response, url);
  } else if (url.includes("/logout")) {
    // ACTION: on logout (reroute to login and destroy cookie)
    logoutRoute(request, response, url);
  } else {
    response.writeHead(404, "Content-Type: text/html");
    response.end("<h1>404 not found</h1>");
  }
};
module.exports = router;
