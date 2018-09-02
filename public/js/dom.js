const body = document.querySelector("body");
const register = document.querySelector("#submit-register");
const signIn = document.querySelector("#submit-login");

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const colourInput = document.querySelector("#colour");

window.addEventListener("load", event => {
  console.log("iloaded!");
  getWelcomeData("/user-data");
});

function xhrRequest(method, url, cb) {
  const xhr = new XMLHttpRequest();
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

function getWelcomeData() {
  const url = "/user-data";
  xhrRequest("GET", url, (err, data) => {
    if (err) new Error();
    if (!data.logged_in) {
      console.log("NOT logged in!");
      body.style.backgroundColor = "#f1e2d0";
    } else {
      console.log("logged in!");
      console.log("this is data in the front:", data.colour);
      body.style.backgroundColor = data.colour;
      const name = document.querySelector("#name");
      name.innerText = data.username;
    }
  });
}
