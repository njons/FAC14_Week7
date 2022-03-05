import xhrRequest from "./xhrRequest.js";

const checkPassword = (userData) => {
  const url = "/password-check";
  xhrRequest("POST", url, userData, (err, data) => {
    console.log("data from endpoint /password-check:", data);
    if (err) new Error();
    if (data.status === "success") {
      fetch("/redirect")
        .then((response) => {
          if (response.url) {
            window.location.replace(response.url);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
};

//redirect welcome
// response.writeHead(302, {
//   Location: "/welcome",
//   "Set-Cookie": `status=${token}; HttpOnly`,
// });
// if (err) new Error();
// if (!data.logged_in) {
//   console.log("NOT logged in!");
//   body.style.backgroundColor = "#f1e2d0";
// } else {
//   // console.log("logged in!");
//   // console.log("this is data in the front:", data.colour);
//   body.style.backgroundColor = data.colour;
//   const name = document.querySelector("#name");
//   name.innerText = data.username;
// }
//   // function errorStyling(element, string) {
//   //   element.style.backgroundColor = "rgba(247, 223, 62, 0.5)";
//   //   element.placeholder = " add a " + string;
//   //   element.value = "";
//   element.addEventListener("focus", event => {
//     element.style.backgroundColor = "white";
//     element.placeholder = "";
//   });
// }
//
// if (username.length === 0 && password.length === 0) {
//   errorStyling(usernameInput, "username");
//   errorStyling(passwordInput, "password");
// } else if (username.length === 0) {
//   errorStyling(usernameInput, "username");
// } else if (password.length === 0) {
//   errorStyling(passwordInput, "password");
// }
// var validName = lowerCaseName.replace(/\s/g, "");
// console.log(lowerCaseName);
// });

// function isUser() {
//   const url = "/verify-login";
//   xhrRequest("POST", url, (err, data) => {
//     if (err) new Error();
//     if (!data.logged_in) {
//       console.log("NOT logged in!");
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

export default checkPassword;
