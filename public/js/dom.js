console.log("this is dom.js");

var body = document.querySelector("body");
var register = document.querySelector("#submit-register");
var signIn = document.querySelector("#submit-login");

var usernameInput = document.querySelector("#username");
var passwordInput = document.querySelector("#password");
var colourInput = document.querySelector("#colour");

// register.addEventListener("click", function(event) {
//   event.preventDefault();
//   getBgColour();
// });
//
// signIn.addEventListener("click", function(event) {
//   event.preventDefault();
//   getBgColour();
// });
//
// logout.addEventListener("click", function(event) {
//   event.preventDefault();
//   revertBgColour();
// });

// var username = usernameInput.value;
// var password = passwordInput.value;
// var colour = colourInput.value;

// function register("POST" url, cb) {
//   xhrRequest('/login')
// }
//
// function login(querystring, cb) {
//   requestPost('/login', querystring, cb);
// }

function revertBgColour() {
  var url = "/logout";
  body.style.backgroundColor = "#f1e2d0";
}

function getBgColour() {
  var url = "/user-data";
  xhrRequest("GET", url, function(err, data) {
    if (err) new Error();
    console.log("this is data in the front:", data.colour);
    body.style.backgroundColor = data.colour;
    var name = document.querySelector("#name");
    name.innerText = data.username;
  });
}

function xhrRequest(method, url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("this is the xhr data:", xhr.responseText);
      cb(null, JSON.parse(xhr.responseText));
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      cb("error" + xhr.responseType);
    }
  };
  xhr.open(method, url, true);
  xhr.send();
}
