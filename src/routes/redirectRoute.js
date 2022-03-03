import { setToken } from "../utils/handleJwt.js";
import pwMatch from "../queries/pwMatch.js";
import getUserId from "../queries/getUserId.js";

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

export const loginUserRoute = (request, response, url) => {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    console.log("/redirect-test", data);

    // let data = "";
    // request.on("data", (chunk) => {
    //   data += chunk;
    // });
    // request.on("end", () => {
    //   data = JSON.parse(data);
    //   const username = validateName(data.username);
    //   const password = validatePwd(data.password);
    //   // queries: ask for pw and user id
    //   const passwordMatch = async () => {
    //     const pwStatus = pwMatch(username, password);
    //     const userId = getUserId(username);
    //     return await Promise.all([pwStatus, userId]);
    //   };
    //   passwordMatch()
    //     .then((dbResult) => {
    //       if (!dbResult[0]) {
    //         // passwords don't match
    //         response.writeHead(200, { "content-type": "application/json" });
    //         response.end(
    //           JSON.stringify({
    //             status: "fail",
    //             message: `username or password incorrect`,
    //           })
    //         );
    //       } else {
    //         // passwords match
    //         response.writeHead(200, { "content-type": "application/json" });
    //         response.end(
    //           JSON.stringify({
    //             status: "success",
    //             message: "password is a match",
    //             data: {
    //               username: username,
    //               match: true,
    //               userId: dbResult[1].id,
    //             },
    //           })
    //         );
    //       }
    //     })
    //     .catch((error) => {
    //       response.writeHead(500, { "content-type": "application/json" });
    //       response.end(
    //         JSON.stringify({
    //           status: "fail",
    //           message: `Something went wrong`,
    //         })
    //       );
    //     });
    // });

    const { match, userId } = data;
    // const hasCookie = request.headers.cookie;
    const token = setToken(match, userId);
    console.log(token);
    response.writeHead(302, {
    "Content-Type": "text/html", 
      Location: "/welcome",
      "Set-Cookie": `status=${token}; HttpOnly`,
    });
    response.end();
   });
};
