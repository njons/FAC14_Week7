import serveHtml from "../utils/serveHtml.js";

export const loginRoute = (request, response, url) => {
  serveHtml(response, "index.html");
};
