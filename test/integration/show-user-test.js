var app = require('../../app');
var request = require('supertest')(app);
var should = require('chai').should();
var User = require('../../models/user');
var fixtures = require('../fixtures.js');

describe.only('User: show', function() {

  var user = fixtures.user.default;

  before(function(done) {
    User.forge(user).save().then(function(user) {
      done();
    });
  });

  it('should show existing user', function(done) {

    var username = user.username;
    request.get('/u/' + username)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        should.not.exist(err);
        res.body.should.have.property('username', username);

        done();
      });
  });

  it('should NOT show nonExistantUser', function(done) {

    var username = 'nonExistantUsersss';

    request.get('/u/' + username)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, function(err, res) {
        should.not.exist(err);
        res.body.should.have.property('message', 'User not found');

        done();
      });
  });
});
