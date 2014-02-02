var storage = require('./storage');
var fs = require('fs');

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  'Content-Type': 'application/json'
};


var handleRequest = function(request, response) {

  var statusCode = 200, headers = defaultCorsHeaders;
  response.writeHead(statusCode, headers);
  if (request.method === "GET") {
    storage.getLatest(function(err, data) {
      if (err) throw new Error(err);
      response.write(JSON.stringify({results: data}));
      response.end();
    });
  } else if (request.method === "POST") {
    storage.postMessage(request, response);
  } else {
    response.end();
  }

};


module.exports.handleRequest = handleRequest;