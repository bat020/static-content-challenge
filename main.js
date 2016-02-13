const http = require('http');
const url = require('url');
const fs = require('fs');
const markdown = require('markdown').markdown;

http.createServer(function (request, response) {
  fs.readFile('template.html', function (error, templateData) {
    if (error) {
      serveErrorPage(error, response);
    } else {
      renderTemplate(templateData, request, response);
    }
  });
}).listen(8081);

function renderTemplate(templateData, request, response) {
  const route = getRouteFromRequest(request);
  const mdFile = getFileFromRoute(route);
  fs.readFile(mdFile, function (error, mdContent) {
    if (error) {
      serveErrorPage(error, response);
    } else {
      serveContentPage(templateData, mdContent, route, response);
    }
  });
}

function serveContentPage(templateData, mdContent, route, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(buildWebPage(templateData, mdContent));
  console.log(`200: served up ${route}`);
}

function serveErrorPage(error, response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.end('404 error: cannot find that page');
  console.error(`404: cannot find /${error.path}`);
}

function buildWebPage(templateData, mdContent) {
  const content = markdown.toHTML(mdContent.toString());
  const template = templateData.toString();
  return template.replace('{{content}}', content);
}

function getRouteFromRequest(request) {
  return url.parse(request.url).pathname;
}

function getFileFromRoute(route) {
  return `content${route}/index.md`;
}

console.log('Server running at http://127.0.0.1:8081/');
