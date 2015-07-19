var app = require('../../../app.js');
var request = require('supertest')(app);
var User = require('../../../models/user');
var fixtures = require('../../fixtures');

var test = require('tape');
const before = test;
const after = test;

var user = fixtures.user.default;

before('setup for `show user test`', function(t) {
  // truncate user table TODO
  User.forge(user).save().then(function(thing) {
    t.end();
  });
});

test('show existing user', function(t) {
  var username = user.username;

  request.get('/u/' + username)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, function(err, res) {

      t.notOk(err, 'should not err');
      t.equal(res.body.username, username, 'username should match');

      t.end();
    });
});

test('should NOT show nonExistantUser', function(t) {
  var username = 'nonExistantUsersss';

  request.get('/u/' + username)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404, function(err, res) {

      t.notOk(err, 'should not error');
      t.equal(res.body.message, 'User not found');

      t.end();
    });
});
