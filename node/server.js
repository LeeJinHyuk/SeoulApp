var http = require("http");
var url = require("url");
var fs = require("fs");

var serverObj;

function setEvent() {
  serverObj.on("request", function(request, response) {
    var pathName;
    var method;

    pathName = url.parse(request.url).pathname;
    method = request.method;

    if (pathName.indexOf("/scripts/") !== -1 ||
        pathName.indexOf("/styles/") !== -1) {
          fs.readFile(__dirname + "/../", function(error, data) {
            response.writeHead(200);
            response.end(data);
          });
    } else {
      fs.readFile(__dirname + "/.." + "/index.html", function(error, data) {
        response.writeHead(200, {"Content-Type" : "text/html"});
        response.end(data);
      });
    }
  });
}

function _start() {
  console.log("start server");
  serverObj = http.createServer();
  setEvent();
  serverObj.listen(9574);
}

exports.start = _start;
