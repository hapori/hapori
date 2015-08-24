var test = require('tape');
var request = require('supertest');
var app = require('../../../app.js');
var fixtures = require('../../fixtures');
var cole = require('../../../db/co_log_err.js').cole;

var bookshelf = require('../../../lib/bookshelf')
var User = require('../../../models/user');
var Post = require('../../../models/post');
var Forum = require('../../../models/forum');
var Vote = require('../../../models/vote');
var Payment = require('../../../models/payment');


var user = null

// testpassword

// store user in db
test('setup signin tests', function (t) {
  cole(function*() {
    user = yield User.forge(fixtures.users.testUser).save();
    t.end()
  });
});





test('signin with the right credentials', function(t) {

  var req = JSON.parse(JSON.stringify(fixtures.req.signinRequest))

  request(app)
    .post('/signin')
    .send(req)
    .expect(201)
    .end(function(err, res){

      t.error(err, 'no Error');
      var cookie = 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoidGVzdFVzZXIxMjMiLCJlbWFpbCI6InRlc3R1c2VyMTIzQHRlc3QuY29tIiwicGFzc3dvcmRIYXNoIjoiWUw2UFJrcU9VbTl3ZmhkcTZBMk9LSVNUeHNDc25jTk5zRkd5NGNCcWM3cz0iLCJzYWx0IjoiYWFkNjk5MWM1YjFjZDRjYjllYjFlNDJiIiwia2V5IjoiOWE5ZjA5NjllOTJlZGRjZTZjODIwYWMyZTFkN2RkMDJjODMwMjBkMTE4M2Y2MzEwYTAxZmI5ZTY3ZDg0NGQ1MCIsImFkZHJlc3MiOiJuMXF1MkprUUY2THJNN2RBWHpmMllaOGRXblBiYWFhYWFhIiwiYmFsYW5jZSI6MTAwMCwiam9pbmVkIjoiMTIzNDU2NyIsInJhbmsiOm51bGwsInN0YXR1cyI6bnVsbCwiaWF0IjoxNDM5OTE4MTU5LCJleHAiOjE0NDAwOTA5NTl9.Ya7dujPSxbGG1MYsZXypGIY4CSAqCfgRlMlq_LIXqMg; Path=/'
      t.equal(res.headers['set-cookie'][0].substring(0, 50), cookie.substring(0, 50), 'cookie set correctly')
      t.equal(res.body.success, true, 'success = true')
      t.end()

    });
});



test('signin with the wrong email', function(t) {

  var req = JSON.parse(JSON.stringify(fixtures.req.signinRequest))
  req.email = 'wrong@email.com'


  request(app)
    .post('/signin')
    .send(req)
    .expect(200)
    .end(function(err, res){

      t.error(err, 'no Error');
      t.equal(res.body.success, false, 'success = false')
      t.ok(typeof res.headers['set-cookie'] === "undefined", 'no cookie set')
      t.end()

    });
});




test('signin with the wrong password', function(t) {

  var req = JSON.parse(JSON.stringify(fixtures.req.signinRequest))
  req.password = 'wrongPassword'


  request(app)
    .post('/signin')
    .send(req)
    .expect(200)
    .end(function(err, res){

      t.error(err, 'no Error');
      t.equal(res.body.success, false, 'success = false')
      t.ok(typeof res.headers['set-cookie'] === "undefined", 'no cookie set')
      t.end()

    });
});





// delete the paymentUser
test('teardown signin tests', function (t) {
  cole(function*() {
    yield user.destroy()

    yield bookshelf.knex('users').truncate()
    yield bookshelf.knex('posts').truncate()
    yield bookshelf.knex('forums').truncate()
    yield bookshelf.knex('votes').truncate()
    yield bookshelf.knex('payments').truncate()

    t.end()
  });
});



