var storage = require('./storage');

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};


var handleRequest = function(request, response) {

  var statusCode = 200, headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  response.writeHead(statusCode, headers);

  if (request.method === "GET") {
    response.write(JSON.stringify(storage.getLatest()));
    response.end();
  } else if (request.method === "POST") {
    storage.postMessage(request, response);
  } else {
    response.end();
  }
  
};


module.exports.handleRequest = handleRequest;