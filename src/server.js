// what do we need to create a server
import http from "http";
// what code do we need to access?
import router from "./router.js";

const server = http.createServer(router);
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

server.listen(port, () => {
  console.log(`server is running at: http://${host}:${port}`);
});
