import fs from "fs";
import path from "path";
import mime from "mime";
import serveHtml from "../utils/serveHtml.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const homeRoute = (request, response, url) => {
  serveHtml(response, "index.html");
};

export const publicRoute = (request, response, url) => {
  const ext = url.split(".")[1];
  fs.readFile(path.join(__dirname, "..", "..", url), (err, file) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Woops womething webt wrong</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": mime.getType(ext),
      });
      response.end(file);
    }
  });
};
