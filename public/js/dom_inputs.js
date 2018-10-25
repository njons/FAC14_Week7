console.log("this is dom_inputs.js");

var usernameInput = document.querySelector("#username");
var passwordInput = document.querySelector("#password");

console.log(passwordInput);

var loginButton = document.querySelector("#submit-login");

console.log(loginButton);

loginButton.addEventListener("click", event => {
  // var username = usernameInput.value;
  var username = usernameInput.value.toLowerCase().replace(/\s/g, "");
  var password = passwordInput.value.replace(/\s/g, "");
  console.log("this is the legth of the username:", username.length);
  console.log("this is the legth of the password:", password.length);

  function errorStyling(element, string) {
    element.style.backgroundColor = "rgba(247, 223, 62, 0.5)";
    element.placeholder = " add a " + string;
    element.value = "";
    element.addEventListener("focus", event => {
      element.style.backgroundColor = "white";
      element.placeholder = "";
      element.value = "";
    });
  }

  if (username.length === 0 && password.length === 0) {
    errorStyling(usernameInput, "username");
    errorStyling(passwordInput, "password");
  } else if (username.length === 0) {
    errorStyling(usernameInput, "username");
  } else if (password.length === 0) {
    errorStyling(passwordInput, "password");
  }
  // var validName = lowerCaseName.replace(/\s/g, "");
  // console.log(lowerCaseName);
});
