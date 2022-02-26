import { setToken, readToken } from "../utils/handleJwt.js";

// import querystring from "querystring";
import pwMatch from "../queries/pwMatch.js";
import getUserId from "../queries/getUserId.js";
// import jwt from "jsonwebtoken";

// export const validateName = (username) => {
//   // console.log("this is username:", username);
//   const lowerCaseName = username.toLowerCase();
//   if (lowerCaseName.length === 0) {
//     return "username is empty";
//   } else {
//     return lowerCaseName.replace(/\s/g, "");
//   }
// };

// export const validatePwd = (pwd) => {
//   if (pwd.length === 0) {
//     return "password is empty";
//   } else {
//     return pwd.trim();
//   }
// };

export const authRoute = (request, response, url) => {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    data = JSON.parse(data);
    console.log("data in server:", data);
    // check for cookie
    const hasCookie = request.headers.cookie;
    // no cookie > set cookie
    if (hasCookie === undefined) {
      const id = getUserId(data, (err, data) => data);
      if (id) {
        console.log("there is id;", id);
        // const data = { match: dbResult, id: id };
        // console.log("data from db", data);
        // cb(null, data);
      }
      //else {
      // const token = setToken(true, userId);
      // response.writeHead(200, {
      //   "content-type": "application/json",
      //   "Set-Cookie": `status=${token}; HttpOnly`,
      // });
      // response.end(
      //   JSON.stringify({
      //     status: "success",
      //     data: { username, id: userId },
      //   })
      // );
      // const username = validateName(data.username);
      // const password = validatePwd(data.password);
      // // check input passwords against db password
      // pwMatch(username, password, (err, dbResult) => {
      //   if (err) {
      //     response.writeHead(500, { "content-type": "application/json" });
      //     response.end(
      //       JSON.stringify({
      //         status: "fail",
      //         message: `Something went wrong`,
      //       })
      //     );
      //   } else {
      //     if (!dbResult) {
      //       // passwords don't match
      //       response.writeHead(200, { "content-type": "application/json" });
      //       response.end(
      //         JSON.stringify({
      //           status: "fail",
      //           message: `username or password incorrect`,
      //         })
      //       );
      //     } else {
      //       // passwords match
      //       response.writeHead(200, { "content-type": "application/json" });
      //       response.end(
      //         JSON.stringify({
      //           status: "success",
      //           message: "password is a match",
      //           data: { name: username, match: dbResult },
      //         })
      //       );
      //     }
    }
    //  });
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
