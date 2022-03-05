import { readToken } from "./handleJwt.js";

const handleCookies = (cookie) => {
  if (cookie !== undefined) {
    const token = cookie.split("=")[1];
    const decodedToken = readToken(token);
    const {
      logged_in,
      user_id: { id },
    } = decodedToken;
    return { logged_in, id };
  } else {
    return null;
  }
};

export default handleCookies;
