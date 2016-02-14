# Static Content challenge

* clone this repo to install
* `$ node server.js` to run the server
* `$ mocha` to run the tests

### Notes

This is the first time I've used node.js so I decided to code the server from scratch rather than working with Express or a similar framework. The only third-party library I've used is npm's [markdown](https://github.com/evilstreak/markdown-js) package, plus Mocha for testing.

The code is in `server.js`, the bulk of it comprising a short chain of callbacks. On receiving a request, the server fetches the template, then fetches the content, then serves up the appropriate HTML (or an error page if anything has failed along the way).

The tests are in `test/test.js` and operate with a markdown file `test/test.md`. This is copied into `content/_test` before the suite runs and torn down afterwards. My thinking here is that the tests shouldn't depend on particular names or files being present in the `content` folder.

**Anindya Bhattacharyya**  
February 2016  
bat020@gmail.com

challenge originally cloned from [github.com/jayfresh/static-content-challenge](https://github.com/jayfresh/static-content-challenge)
