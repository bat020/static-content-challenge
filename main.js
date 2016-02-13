const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (request, response) {
  const route = getRouteFromRequest(request);
  const mdFile = getFileFromRoute(route);
  fs.readFile(mdFile, function (error, data) {
    if (error) {
      serveErrorPage(error, response);
    } else {
      serveContentPage(data, route, response);
    }
  });
}).listen(8081);

function serveContentPage(data, route, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end(getContentFromData(data));
  console.log(`200: served up ${route}`);
}

function serveErrorPage(error, response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.end('404 error: cannot find that page');
  console.error(`404: cannot find /${error.path}`);
}

function getContentFromData(data) {
  return data.toString();
}

function getRouteFromRequest(request) {
  return url.parse(request.url).pathname;
}

function getFileFromRoute(route) {
  return `content${route}/index.md`;
}

console.log('Server running at http://127.0.0.1:8081/');
