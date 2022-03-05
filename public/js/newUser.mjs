import xhrRequest from "./xhrRequest.js";

const newUser = (userData) => {
  console.log("data:", userData);
  // console.log("this is register.mjs");
  const url = "/new-user";
  xhrRequest("POST", url, userData, (err, data) => {
    console.log("data from db:", data);
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
  });
};

export default newUser;
