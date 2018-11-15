console.log("this is dom.js");

const body = document.querySelector("body");

document.addEventListener("DOMContentLoaded", event => {
  console.log("iloaded!");
  getWelcomeData("/user-data");
});

function getWelcomeData() {
  const url = "/user-data";
  xhrRequest("GET", url, (err, data) => {
    if (err) new Error();
    if (!data.logged_in) {
      // console.log("NOT logged in!");
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
