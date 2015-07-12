var db = require('../db');
var cole = require('../db/co_log_err.js').cole;
before(function beforeEachTest(done) {

  cole(function*() {
    // remove users before tests
    yield db.remove('users', {});

    done();
  });
});
