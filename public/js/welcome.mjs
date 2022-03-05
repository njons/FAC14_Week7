import xhrRequest from "./xhrRequest.js";

// const getWelcomeData = () => {
//   console.log("getWelcomeData!");
//   // const url = "/user-data";
//   fetch("/user-data")
//     .then((response) => {
//       console.log("data from endpoint /user-data:", response);
//       response.json();
//       // function getWelcomeData(url) {
//       //   const body = document.querySelector("body");
//       //   xhrRequest("GET", url, (err, data) => {
//       //     if (err) new Error();
//       //     if (!data.logged_in) {
//       //       // console.log("NOT logged in!");
//       //       body.style.backgroundColor = "#f1e2d0";
//       //     } else {
//       //       // console.log("logged in!");
//       //       // console.log("this is data in the front:", data.colour);
//       //       body.style.backgroundColor = data.colour;
//       //       const name = document.querySelector("#name");
//       //       name.innerText = data.username;
//       //     }
//       //   });
//       // }

//       // const redirect = (data) => {
//       //   fetch("/redirect").then((response) => {
//       //     console.log(response);
//       //     if (response) {

//       //       window.location.href = response.url;
//       //     }
//       //   });
//       // };
//       // if (response) {
//       //   // window.location.href = response.url;
//       // }
//     })
//     .then((data) => console.log(data));
//   // xhrRequest("GET", url, userData, (err, data) => {
//   //   console.log("data from endpoint /user-data:", data);
//   //   if (err) new Error();
//   //   if (data.status === "success") {
//   //     // redirect();
//   //   } else if (data.status === "fail") {
//   //     // IU feedback on error
//   //     // no cookie
//   //   }
//   // });
// };

// export default getWelcomeData;
const getWelcomeData = () => {
  console.log("in getWelcomeData!");
  fetch("/user-data")
    .then((response) => response.json())
    .then((data) => {
      const body = document.querySelector("body");
      const name = document.querySelector("#name");
      if (data.data.logged_in) {
        body.style.backgroundColor = data.data.colour;
        name.innerText = data.data.username;
      } else {
        body.style.backgroundColor = "#f1e2d0";
      }

      // console.log("This is data from endpoint:", data);
    })
    .catch((err) => {
      if (err) {
        console.log("sorry error!", err);
        window.location.replace("/");
      }
    });
};

export default getWelcomeData;
