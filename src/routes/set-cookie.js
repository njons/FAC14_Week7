import { setToken } from "../utils/handleJwt.js";

export const setCookieRoute = (request, response, url) => {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    data = JSON.parse(data);
    const { match, userId } = data;
    // check for cookie
    const hasCookie = request.headers.cookie;
    const setCookie = () => {
      let header = null;
      if (hasCookie === undefined) {
        const token = setToken(match, userId);
        header = {
          Location: "http://localhost:3000/welcome",
          Hello: "name",
          "Set-Cookie": `status=${token}; HttpOnly`,
        };
      } else {
        header = {
          // Location: "http://localhost:3000/welcome",
          Goodbye: "name",
          "Content-Type": "application/json",
        };
      }
      return Promise.resolve(header);
    };

    // response.writeHead(302, {
    //     Location: 'https://staging.dx.host.com' + req.url',
    //     'Set-Cookie': 'fake-token=5b49adaaf7687fa'
    // });

    setCookie()
      .then((header) => {
        // const cookie = await readToken(hasCookie);
        // response.writeHead(200, header);
        response.writeHead(302, header);
        response
          .end
          // JSON.stringify({
          //   status: "success",
          //   message:
          //     hasCookie === undefined ? "New cookie set" : "Alreday has cookie",
          // })
          ();
      })
      .catch((err) => {
        console.error("error", err.constraint);
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
