import serveHtml from "../utils/serveHtml.js";

export const registerRoute = (request, response, url) => {
  serveHtml(response, "register.html");
};
