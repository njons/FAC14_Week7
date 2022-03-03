// what code do we need to access?
import { homeRoute, publicRoute } from "./routes/index.js";
import { loginRoute } from "./routes/login.js";
import { passwordCheckRoute } from "./routes/password-check.js";
import { registerRoute } from "./routes/register.js";
import { newUserRoute } from "./routes/new-user.js";
import { loginUserRoute } from "./routes/redirectRoute.js";
import {
  welcomeRoute,
  welcomeDataRoute,
  logoutRoute,
} from "./routes/welcome.js";

const router = (request, response) => {
  const url = request.url;
  if (url === "/") {
    // PAGE: home
    homeRoute(request, response, url);
  } else if (url.includes("/public")) {
    publicRoute(request, response, url);
  } else if (url.includes("/login")) {
    // PAGE: login
    loginRoute(request, response, url);
  } else if (url.includes("/password")) {
    passwordCheckRoute(request, response, url);
  } else if (url.includes("/redirect")) {
    loginUserRoute(request, response);
  } else if (url.includes("/register")) {
    // PAGE: register
    registerRoute(request, response, url);
  } else if (url.includes("/new-user")) {
    newUserRoute(request, response);
  } else if (url.includes("/welcome")) {
    // PAGE: welcome
    welcomeRoute(request, response, url);
  } else if (url.includes("/user-data")) {
    welcomeDataRoute(request, response, url);
  } else if (url.includes("/logout")) {
    logoutRoute(request, response, url);
  } else {
    response.writeHead(404, "Content-Type: text/html");
    response.end("<h1>404 not found</h1>");
  }
};

export default router;
