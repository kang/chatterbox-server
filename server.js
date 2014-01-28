var http = require("http");
var handler = require("./handler");

var port = 8080, ip = "127.0.0.1";

var server = http.createServer(function(request, response) {
  handler.handleRequest(request, response);
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);