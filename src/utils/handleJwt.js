import jwt from "jsonwebtoken";
const key = "jaffa";

export const setToken = (loggedIn, userId) => {
  // console.log("this is the Id in the cookie:", userId);
  const payload = {
    logged_in: loggedIn,
    user_id: userId,
  };
  const options = { expiresIn: "30d" };
  return jwt.sign(payload, key, options);
};

export const readToken = (hasCookie) => {
  const token = hasCookie.split("=")[1];
  return jwt.verify(token, key);
};

// export default setToken;
