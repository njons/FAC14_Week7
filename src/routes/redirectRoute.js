export const redirectRoute = (request, response, url) => {
  response.writeHead(302, {
    Location: "/welcome",
  });
  response.end();
};
