var http = require('http');
var handler = require('./handler');
var connect = require('connect');
var database = require('./database');

var port = 8080, ip = "127.0.0.1";

var app = connect()
  .use(connect.static('./client'))
  .use(function(req, res){
    handler.handleRequest(req, res);
});

console.log("Listening on http://" + ip + ":" + port);
http.createServer(app).listen(port, ip);