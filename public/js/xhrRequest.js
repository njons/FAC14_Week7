const xhrRequest = (method, url, data, cb) => {
  // console.log("method:", method);
  // console.log("url:", url);
  console.log("data:", data);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // console.log("xhr.responseText", xhr.responseText);
      // console.log(typeof xhr.responseText);
      // if (typeof xhr.responseText === "string") {
      //   cb(null, xhr.responseText);
      // } else {
      const response = JSON.parse(xhr.responseText);
      // console.log("response", response);
      cb(null, response);
      // }
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      cb("error" + xhr.responseType);
    }
  };
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
};

export default xhrRequest;
