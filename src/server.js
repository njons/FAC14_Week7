// what do we need to create a server
const http = require("http");
// what code do we need to access?
const router = require("./router");

const server = http.createServer(router);
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

server.listen(port, () => {
  console.log(`server is running at: http://${host}:${port}`);
});
