// declare dependencies

require('../main');

const fs = require('fs');
const http = require('http');
const assert = require('assert');

// three tests

describe('Static Content Challenge', () => {

  before((done) => createTestRoute(done));
  after(() => destroyTestRoute());

  it('should return status code 200 for a valid URL', (done) => {
    http.get('http://localhost:8081/test', (response) => {
      assert.equal(200, response.statusCode);
      done();
    });
  });

  it('should include relevant content for a valid URL', (done) => {
    http.get('http://localhost:8081/test', (response) => {
      var data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        assert.ok(data.includes('<h1>test</h1>'));
        assert.ok(data.includes('<p>This is a test file.</p>'));
        done();
      });
    });
  });

  it('should return status code 404 for an invalid URL', (done) => {
    http.get('http://localhost:8081/invalid', (response) => {
      assert.equal(404, response.statusCode);
      done();
    });
  });

});

// set up and tear down

function createTestRoute(done) {
  fs.mkdir('content/test', () => {
    fs.readFile('test/test.md', (_, data) => {
      fs.writeFile('content/test/index.md', data.toString());
      done();
    });
  });
}

function destroyTestRoute() {
  fs.unlink('content/test/index.md', () => fs.rmdir('content/test'));
}
