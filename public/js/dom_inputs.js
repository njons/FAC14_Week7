console.log("this is dom_inputs.js");

var usernameInput = document.querySelector("#username");
var passwordInput = document.querySelector("#password");

console.log(passwordInput);

var submit = document.querySelector("#submit");
// var registerButton = document.querySelector("#submit");

var username = usernameInput.value.toLowerCase().replace(/\s/g, "");
var password = passwordInput.value.replace(/\s/g, "");

submit.addEventListener("click", event => {
  event.preventDefault();
  // var username = usernameInput.value;
  // console.log("this is the length of the username:", username.length);
  // console.log("this is the length of the password:", password.length);

  console.log("you clicked the login button");
  // check if input is in the database
  isUser();

  // function errorStyling(element, string) {
  //   element.style.backgroundColor = "rgba(247, 223, 62, 0.5)";
  //   element.placeholder = " add a " + string;
  //   element.value = "";
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
});

function isUser() {
  var name = usernameInput.value;
  var pwd = passwordInput.value;

  console.log("this is name:", name);
  console.log("this is pwd:", pwd);

  if (name.length === 0) {
    nameInput.value = "";
    nameInput.placeholder = " add a name";
    nameInput.style.backgroundColor = "#f7df3e";
    nameInput.addEventListener("focus", function() {
      this.style.backgroundColor = "transparent";
      this.placeholder = "";
    });
  } else if (pwd.length === 0) {
    birthdateInput.style.backgroundColor = "#f7df3e";
    birthdateInput.addEventListener("focus", function() {
      this.style.backgroundColor = "transparent";
    });
  } else {
    // load a url (to the correct route) with the information needed for the SQL query
    const url = "/get-data?name=" + name + "&birth=" + birth;
    // call the generic xhr request (set method, url and error handling when data comes back)
    xhrRequest("GET", url, function(err, data) {
      if (err) new Error();
      // if the death date is empty...
      if (data.length === 0) {
        // call the random date function to make up a random date
        var randomDate = makeRandomDate();
        // ...and send the data to be added to the database
        postDataToDb(randomDate);

        // if the death date is in the datbase - render it!
      } else {
        renderDate(data[0].deathdate);
      }
    });
  }
}
//
// function postDataToDb() {
//   var name = valitatedName(nameInput.value);
//   var birth = birthdateInput.value;
//   // load a url (to the correct route) with the information needed for the SQL query
//   var url =
//     "/create-user?name=" + name + "&birth=" + birth + "&death=" + randomDate;
//   // call the generic xhr request (set method, url and error handling when data comes back)
//   xhrRequest("POST", url, function(err, data) {
//     if (err) new Error();
//     renderDate(data);
//   });
// }

function isUser() {
  const url = "/verify-login";
  xhrRequest("POST", url, (err, data) => {
    if (err) new Error();
    if (!data.logged_in) {
      console.log("NOT logged in!");
      body.style.backgroundColor = "#f1e2d0";
    } else {
      // console.log("logged in!");
      // console.log("this is data in the front:", data.colour);
      body.style.backgroundColor = data.colour;
      const name = document.querySelector("#name");
      name.innerText = data.username;
    }
  });
}

// generic xhr request (allow to set different methods and urls)
// function xhrRequest(method, url, cb) {
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       console.log("this is xhr", xhr.responseText);
//       console.log(xhr);
//       cb(null, JSON.parse(xhr.responseText));
//     } else if (xhr.readyState === 4 && xhr.status !== 200) {
//       cb("error" + xhr.responseType);
//     }
//   };
//   xhr.open(method, url, true);
//   xhr.send();
// }

//
// function xhrRequest(method, url, cb) {
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       console.log("this is the xhr data:", xhr.responseText);
//       cb(null, JSON.parse(xhr.responseText));
//     } else if (xhr.readyState === 4 && xhr.status !== 200) {
//       cb("error" + xhr.responseType);
//     }
//   };
//   xhr.open(method, url, true);
//   xhr.send();
// }

module.exports = { isUser, postDataToDb };
