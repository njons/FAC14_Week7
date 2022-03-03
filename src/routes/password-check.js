// import { setToken, readToken } from "../utils/handleJwt.js";
// import querystring from "querystring";
import pwMatch from "../queries/pwMatch.js";
import getUserId from "../queries/getUserId.js";
// import jwt from "jsonwebtoken";

export const validateName = (username) => {
  // console.log("this is username:", username);
  const lowerCaseName = username.toLowerCase();
  if (lowerCaseName.length === 0) {
    return "username is empty";
  } else {
    return lowerCaseName.replace(/\s/g, "");
  }
};

export const validatePwd = (pwd) => {
  if (pwd.length === 0) {
    return "password is empty";
  } else {
    return pwd.trim();
  }
};

export const passwordCheckRoute = (request, response, url) => {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", async () => {
    data = await JSON.parse(data);
    const username = validateName(data.username);
    const password = validatePwd(data.password);
    // queries: ask for pw and user id
    const passwordMatch = async () => {
      const pwStatus = pwMatch(username, password);
      const userId = getUserId(username);
      return await Promise.all([pwStatus, userId]);
    };
    passwordMatch()
      .then((dbResult) => {
        if (!dbResult[0]) {
          // passwords don't match
          response.writeHead(200, { "content-type": "application/json" });
          response.end(
            JSON.stringify({
              status: "fail",
              message: `username or password incorrect`,
            })
          );
        } else {
          // passwords match
          response.writeHead(200, { "content-type": "application/json" });
          response.end(
            JSON.stringify({
              status: "success",
              message: "password is a match",
              // data: {
              //   username: username,
              //   match: true,
              //   userId: dbResult[1].id,
              // },
            })
          );
        }
      })
      .catch((error) => {
        response.writeHead(500, { "content-type": "application/json" });
        response.end(
          JSON.stringify({
            status: "fail",
            message: `Something went wrong`,
          })
        );
      });
  });
};

// user not verified
//       response.end();
// response.writeHead(302, {
//   location: "/",
//   "Set-Cookie": "status=0; Max-Age=0",
// });

//   getUserId(username, (err, userId) => {
//     if (err) {
//       response.writeHead(500, {
//         "content-type": "application/json",
//       });
//       response.end(
//         JSON.stringify({
//           status: "fail",
//           message: `Something went wrong`,
//         })
//       );
//     } else if (userId) {
//       // check for cookie
//       const hasCookie = request.headers.cookie;
//       // no Cookie
//       if (hasCookie === undefined) {
//         const token = setToken(true, userId);
//         response.writeHead(200, {
//           "content-type": "application/json",
//           "Set-Cookie": `status=${token}; HttpOnly`,
//         });
//         response.end(
//           JSON.stringify({
//             status: "success",
//             data: { username, id: userId },
//           })
//         );
//       } else {
//         const cookieInfo = readToken(hasCookie);
//         // hasCookie
//         console.log("cookieInfo:", cookieInfo.loggedIn);
//         response.writeHead(302, {
//           Location: "/welcome",
//         });
//         // response.end(
//         //   JSON.stringify({
//         //     status: "success",
//         //     data: { username, id: userId },
//         //   })
//         // );
//       }
//     }
//   });
