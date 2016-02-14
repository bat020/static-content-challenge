// declare dependencies

const fs = require('fs');
const http = require('http');
const url = require('url');
const markdown = require('markdown').markdown;

// main loop

http.createServer((request, response) => {
  fs.readFile('template.html', (error, template) => {
    template = error ? '' : template.toString();
    const route = getRoute(request);
    renderTemplate(template, route, response);
  });
}).listen(process.env.PORT || 8081);

function renderTemplate(template, route, response) {
  fs.readFile(getPath(route), (error, content) => {
    content = error ? '' : content.toString();
    const page = buildPage(template, content);
    servePage(page, route, response);
  });
}

function servePage(page, route, response) {
  const status = page ? 200 : 404;
  response.writeHead(status, {'Content-Type': 'text/html'});
  response.end(page || errorPage());
  console.log(`GET ${route} => status code ${status}`);
}

// page building functions

function buildPage(template, content) {
  if (!template || !content) return '';
  const html = markdown.toHTML(content);
  return template.replace('{{content}}', html);
}

function errorPage() {
  return '<!doctype html>\n<html>\n<head><title>Welcome to ' +
    'Acme</title></head>\n<body>\n<h1>404 error</h1>\n' +
    '<p>That page does not exist.<p>\n</body></html>';
}

// miscellaneous helpers

function getRoute(request) {
  return url.parse(request.url).pathname;
}

function getPath(route) {
  return `content${route}/index.md`;
}

// initial console message

console.log('Server running at http://localhost:8081');
