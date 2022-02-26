import xhrRequest from "./xhrRequest.js";
// import makeCookie from "../../src/utils/makeCookie";
// console.log("this is login.mjs");

// Login process:
// kolla om lösen matchar
// fel: meddelande om fel uppgifter
// rätt: meddelande om rätt >

// gå och hämta id för användare
// fel: "nåt" gick fel
// rätt: sätt kaka (id och login status)

const checkPassword = (userData) => {
  console.log("userData:", userData);
  const url = "/password-check";
  xhrRequest("POST", url, userData, (err, data) => {
    console.log("data:", data);
    if (err) new Error();
    if (data) {
      auth(data.data.username);
    }
  });
};

const auth = (username) => {
  // const { username, match } = data;
  // console.log("username:", username);
  // console.log("match :", match);
  const url = "/auth";
  xhrRequest("POST", url, username, (err, data) => {
    console.log("data:", data);
    if (err) new Error();
    // if (data) {
    //   auth(data.data);
    // }
  });
};

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
// });
// console.log("match:", match);

// const token = makeCookie(true, data.id);

// const token = import("../../src/utils/setToken")
//   .then((module) => module.default(true, dbResult))
//   .catch((error) => {});
// const token = makeCookie(true, dbResult);
// create cookie if none
// console.log("is this a user id?", dbResult);
// const token = makeCookie(true, dbResult);
// jwt.decode token cookie value (readCookie)
// check payload for logged_in: true

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

// xhrRequest("POST", url, userData, (err, data) => {
//   console.log("data:", data);
//   if (err) new Error();
//   if (data) {
//     // import("../../src/utils/setToken")
//     //   .then((module) => module.default(true, "/auth"))
//     //   .catch((error) => {});
//     // return data.data;
//   }

// const token = import("../../src/utils/setToken")
//   .then((module) => module.default(true, dbResult))
//   .catch((error) => {});
// const token = makeCookie(true, dbResult);
// create cookie if none
// console.log("is this a user id?", dbResult);
// const token = makeCookie(true, dbResult);
// jwt.decode token cookie value (readCookie)
// check payload for logged_in: true

//redirect welcome
// response.writeHead(302, {
//   Location: "/welcome",
//   "Set-Cookie": `status=${token}; HttpOnly`,

// submit.addEventListener("click", (event) => {
//   event.preventDefault();
//   // var username = usernameInput.value;
//   // console.log("this is the length of the username:", username.length);
//   // console.log("this is the length of the password:", password.length);

//   console.log("you clicked the login button");
//   // check if input is in the database
//   isUser();

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
//   var name = usernameInput.value;
//   var pwd = passwordInput.value;

//   console.log("this is name:", name);
//   console.log("this is pwd:", pwd);

//   if (name.length === 0) {
//     nameInput.value = "";
//     nameInput.placeholder = " add a name";
//     nameInput.style.backgroundColor = "#f7df3e";
//     nameInput.addEventListener("focus", function () {
//       this.style.backgroundColor = "transparent";
//       this.placeholder = "";
//     });
//   } else if (pwd.length === 0) {
//     birthdateInput.style.backgroundColor = "#f7df3e";
//     birthdateInput.addEventListener("focus", function () {
//       this.style.backgroundColor = "transparent";
//     });
//   } else {
//     // load a url (to the correct route) with the information needed for the SQL query
//     const url = "/get-data?name=" + name + "&birth=" + birth;
//     // call the generic xhr request (set method, url and error handling when data comes back)
//     xhrRequest("GET", url, function (err, data) {
//       if (err) new Error();
//       // if the death date is empty...
//       // if (data.length === 0) {
//       //   // call the random date function to make up a random date
//       //   var randomDate = makeRandomDate();
//       //   // ...and send the data to be added to the database
//       //   postDataToDb(randomDate);

//       //   // if the death date is in the datbase - render it!
//       // } else {
//       //   renderDate(data[0].deathdate);
//       // }
//     });
//   }
// }
// //
// // function postDataToDb() {
// //   var name = valitatedName(nameInput.value);
// //   var birth = birthdateInput.value;
// //   // load a url (to the correct route) with the information needed for the SQL query
// //   var url =
// //     "/create-user?name=" + name + "&birth=" + birth + "&death=" + randomDate;
// //   // call the generic xhr request (set method, url and error handling when data comes back)
// //   xhrRequest("POST", url, function(err, data) {
// //     if (err) new Error();
// //     renderDate(data);
// //   });
// // }

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
