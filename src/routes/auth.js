import { setToken, readToken } from "../utils/handleJwt.js";

export const authRoute = (request, response, url) => {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    data = JSON.parse(data);
    console.log("data", data);
    const { username, match, userId } = data;
    // check for cookie
    const hasCookie = request.headers.cookie;
    // if no cookie > set cookie jwt
    // if cookie  > read cookie jwt
    const handleCookie = async () => {
      let header = null;
      if (hasCookie === undefined) {
        console.log("hasCookie", hasCookie);
        const token = await setToken(match, userId);
        console.log("token", token);
        header = { "Set-Cookie": `status=${token}; HttpOnly` };
      } else {
        header = { "content-type": "application/json" };
      }
      return await Promise.resolve(header);
    };

    handleCookie()
      .then(async (headers) => {
        const cookie = await readToken(hasCookie);
        response.writeHead(200, headers);
        response.end(
          JSON.stringify({
            status: "success",
            message: "Alreday has cookie",
            data: cookie,
          })
        );
      })
      .catch((err) => {
        console.error("error", err.constraint);
        if (err) return err;
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
