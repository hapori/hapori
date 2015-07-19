var app = require('../../../app.js');
var request = require('supertest')(app);
var should = require('chai').should();
var User = require('../../../models/user');
var fixtures = require('../../fixtures');

var db = require('../../../db/index');
var co = require('co');

var test = require('tap').test


var user = fixtures.user.default;

test('before', function(t) {

  co(function*() {
    // remove users before tests
    // yield db.remove('users', {});

    // yield User.forge(user).save();

    t.end();
  });
});


// test('my favorite assert lib', function(t) {
//
//   var username = user.username;
//   request.get('/u/' + username)
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(200, function(err, res) {
//
//       should.not.exist(err);
//       res.body.should.have.property('username', username);
//
//       t.end();
//     });
// });
//
// test('my favorite assert lib', function(t) {
//
//   var username = 'nonExistantUsersss';
//
//   request.get('/u/' + username)
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(404, function(err, res) {
//       should.not.exist(err);
//       res.body.should.have.property('message', 'User not found');
//
//       t.end();
//     });
// });
