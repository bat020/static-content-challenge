var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (request, response) {

  var pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + " received");

  fs.readFile("content" + pathname + "/index.md", function (error, data) {
    if (error) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.end("404 error fetching " + pathname);
      return console.error("404 error fetching " + pathname);
    } else {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end("you asked for: " + pathname + "\n\nYOU GOT IT!");
    }
    console.log("Asynchronous read: " + data.toString());
  });

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
