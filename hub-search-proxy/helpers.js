const https = require("https");


function formatResponse(status, body) {
  return {
      isBase64Encoded: false,
      statusCode: status,
      body: JSON.stringify(body),
      headers: {
          "Access-Control-Allow-Origin": process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGINS,
          "Content-Type": "application/json"
      }
  }
}


function httpPostRequest(host, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      host: host,
      path: path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = https.request(options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error("statusCode=" + res.statusCode));
      }
      let body = [];
      res.on("data", function (chunk) {
        body.push(chunk);
      });
      res.on("end", function () {
        try {
          body = JSON.parse(Buffer.concat(body).toString());
        } catch (e) {
          reject(e);
        }
        resolve(body);
      });
    });
    req.on("error", (e) => {
      reject(e);
    });
    req.write(JSON.stringify(data, null, 2));
    // send the request
    req.end();
  });
}


module.exports = { formatResponse, httpPostRequest }