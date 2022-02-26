import serveHtml from "../utils/serveHtml.js";
import getUserInfo from "../queries/getUserInfo.js";

// serve page
export const welcomeRoute = (request, response, url) => {
  serveHtml(response, "welcome.html");
};

// ACTION: on welcome grab colour from db
export const welcomeDataRoute = (request, response, url) => {
  // console.log(url);
  // check if there is a cookie
  // console.log("(handler) this is the request:", request.headers.cookie);
  if (request.headers.cookie && request.headers.cookie.includes("status")) {
    // use the module cookie to parse the information in the cookie
    const cookies = cookie.parse(request.headers.cookie);
    // console.log("(handler) this is cookie:", cookie);
    // use the module jsonwebtoken to verify the infomatin in the cookie
    jwt.verify(cookies.status, key, (err, decoded) => {
      // console.log("(handler) this is decoded:", decoded);
      // console.log("(handler) this is decoded.id:", decoded.user_id);
      getUserInfo(decoded.user_id, (err, userInfo) => {
        if (err) console.log(err);
        // console.log("hi ", userInfo.rows[0].username);
        // console.log("you like ", userInfo.rows[0].colour);
        const returnObj = {
          username: userInfo.rows[0].username,
          colour: userInfo.rows[0].colour,
          user_id: decoded.user_id,
          logged_in: decoded.logged_in,
        };
        // console.log("returnObj:", returnObj);
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(returnObj));
      });
    });
    // check if no cookie
  } else {
    response.writeHead(302, {
      Location: "/",
      "Set-Cookie": "logged_in=0; Max-Age=0",
    });
    response.end();
  }
};

// ACTION: on logout (reroute to login and destroy cookie)
export const logoutRoute = (request, response, url) => {
  response.writeHead(302, {
    location: "/",
    "Set-Cookie": "status=0; Max-Age=0",
  });
  response.end();
};
