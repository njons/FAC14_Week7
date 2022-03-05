const xhrRequest = (method, url, data, cb) => {
  // console.log("method:", method);
  // console.log("url:", url);
  console.log("xhr req data:", data);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("xhr.responseText", xhr.responseText);
      console.log(xhr.getResponseHeader("content-type"));
      if (xhr.getResponseHeader("content-type") === "application/json") {
        cb(null, JSON.parse(xhr.responseText));
      }
      cb(null, xhr.responseText);
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      cb("error" + xhr.responseType);
    }
  };
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
};

export default xhrRequest;
