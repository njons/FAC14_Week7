import serveHtml from "../utils/serveHtml.js";
import getUserInfo from "../queries/getUserInfo.js";
import handleCookies from "../utils/handleCookies.js";

// serve page
export const welcomeRoute = (request, response, url) => {
  serveHtml(response, "welcome.html");
};

// ACTION: on welcome grab colour from db
export const welcomeDataRoute = (request, response, url) => {
  // check if there is a cookie
  const cookie = request.headers.cookie;
  const decodedToken = handleCookies(cookie);
  if (decodedToken === null) {
    // no cookie = no user id > redirect to home
    response.writeHead(302, {
      Location: "/",
      // "Set-Cookie": "logged_in=0; Max-Age=0",
    });
    response.end();
  } else {
    const { logged_in, id } = decodedToken;
    // use the module jsonwebtoken to verify the infomation in the cookie
    getUserInfo(id)
      .then((data) => {
        const { username, colour } = data;
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({
            status: "success",
            message: `Userdata fetched`,
            data: {
              username: username,
              colour: colour,
              user_id: id,
              logged_in: logged_in,
            },
          })
        );
      })
      .catch((err) => {
        console.error("error", err.constraint);
        response.writeHead(500, { "content-type": "application/json" });
        response.end(
          JSON.stringify({
            status: "fail",
            message: `Something went wrong`,
            error: err,
          })
        );
      });
  }
};

// ACTION: on logout (reroute to login and destroy cookie)
export const logoutRoute = (request, response, url) => {
  response.writeHead(302, {
    Location: "/",
    "Set-Cookie": "status=0; Max-Age=0",
  });
  response.end();
};
