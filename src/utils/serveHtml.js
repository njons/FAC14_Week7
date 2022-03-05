import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const serveHtml = (response, filename) => {
  fs.readFile(
    path.join(__dirname, "..", "..", "public", filename),
    (err, file) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end("<h1>Woops womething webt wrong</h1>");
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(file);
      }
    }
  );
};

export default serveHtml;
