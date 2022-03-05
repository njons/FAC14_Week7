document.addEventListener("DOMContentLoaded", (event) => {
  console.log("I loaded!");
  const url = document.location.pathname;
  let usernameInput = document.querySelector("#username");
  let passwordInput = document.querySelector("#password");

  if (url === "/") {
    const loginButton = document.querySelector("#submit");
    loginButton.addEventListener("click", (event) => {
      event.preventDefault();
      loginButton.disabled = true;
      let username = usernameInput.value.toLowerCase().trim();
      let password = passwordInput.value.replace(/\s/g, "").trim();
      const dataToSend = { username, password };
      if (username !== "" && password !== "") {
        loginButton.disabled = false;
        import("./login.mjs")
          .then((module) => module.default(dataToSend))
          .catch((error) => {});
      } else {
        console.log("username or password is missing");
      }
    });
  }

  if (url === "/register") {
    // identify the submit button
    const registerButton = document.querySelector("#submit");
    registerButton.addEventListener("click", (event) => {
      event.preventDefault();
      registerButton.disabled = true;
      let username = usernameInput.value.toLowerCase().trim();
      let password = passwordInput.value.replace(/\s/g, "").trim();
      let color = document.querySelector("#color").value;
      const dataToSend = { username, password, color };
      if (username && password && color) {
        import("./newUser.mjs")
          .then((module) => module.default(dataToSend))
          .catch((error) => {});
      }
    });
  }

  if (url === "/welcome") {
    // console.log("url!", url);
    // identify the submit button
    import("./welcome.mjs")
      .then((module) => module.default())
      .catch((error) => {});
    // getWelcomeData("/user-data");
    // const registerButton = document.querySelector("#submit");
    // registerButton.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   let username = usernameInput.value.toLowerCase().trim();
    //   let password = passwordInput.value.replace(/\s/g, "").trim();
    //   let color = document.querySelector("#color").value;
    //   const dataToSend = { username, password, color };
    //   if (username && password && color) {
    //     import("./newUser.mjs")
    //       .then((module) => module.default(dataToSend))
    //       .catch((error) => {});
    //   }
    // });
  }

  //getWelcomeData("/user-data");
});

// export default xhrRequest;

// export default ILoaded;

// function getWelcomeData(url) {
//   const body = document.querySelector("body");
//   xhrRequest("GET", url, (err, data) => {
//     if (err) new Error();
//     if (!data.logged_in) {
//       // console.log("NOT logged in!");
//       body.style.backgroundColor = "#f1e2d0";
//     } else {
//       // console.log("logged in!");
//       // console.log("this is data in the front:", data.colour);
//       body.style.backgroundColor = data.colour;
//       const name = document.querySelector("#name");
//       name.innerText = data.username;
//     }
//   });
// }

// export default getWelcomeData;
