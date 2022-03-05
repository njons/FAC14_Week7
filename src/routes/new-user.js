import createUser from "../queries/createUser.js";

export const validateName = (username) => {
  if (username === undefined || username === "") {
    return { status: "fail", message: "username is empty" };
  } else {
    const lowerCaseName = username.toLowerCase();
    return lowerCaseName.replace(/\s/g, "");
  }
};

export const validatePwd = (pwd) => {
  if (pwd === undefined || pwd === "") {
    return { status: "fail", message: "password is empty" };
  } else {
    return pwd.trim();
  }
};

export const newUserRoute = (request, response) => {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    // console.log("data in server:", data);
    data = JSON.parse(data);
    const username = validateName(data.username);
    const password = validatePwd(data.password);
    createUser(username, password, data.color, (err, dbResponse) => {
      if (err) {
        // error when user is created > return info that user already exists
        response.writeHead(200, { "content-type": "text/html" });
        response.end(
          JSON.stringify({
            status: "fail",
            error: err.constraint,
            message:
              err.constraint !== undefined
                ? `User ${username} already exists` // users_username_key
                : `There was a problem adding new user: ${username}`,
          })
        );
      } else if (dbResponse) {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({
            status: "success",
            message: `New user added: ${username}`,
          })
        );
      }
    });
  });
};
