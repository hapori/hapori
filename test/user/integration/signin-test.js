var app = require('../../../app');
var request = require('supertest')(app);
var should = require('chai').should();
var co = require('co');
var crypto = require('crypto');
var User = require('../../../models/user');
var async = require('async');

var test = require('tape');
const before = test;
const after = test;

before('bedfore', function(t) {

  var password = 'testpassword'
  var salt = 'salt'
  var user = {
    username: 'existingUser',
    email: 'existingUser@test.com',
    passwordHash: crypto.createHash('sha256').update(salt + ':' + password).digest('base64'),
    salt: salt,
    balance: 1000,
    key: 'some bitcoin key',
    address: '15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE',
    joined: '1827369128'
  };

  User.fetchAll().then(function(users) {

    async.each(users.models, function iterator(_user, next) {
      // a stupid hack to empty the users table before test
      _user.destroy().then(function() {
        next(null);
      });

    }, function(err) {
      // create test user
      User.forge(user).save().then(function(__user) {
        t.end();
      });
    });
  });
});

test('should signin a user', function(t) {

  var username = 'existingUser';
  var password = 'testpassword';

  request.post('/signin')
    .send({
      username: username,
      password: password
    })
    .set('Accept', 'application/json') // another test that accepts html
    .expect('Content-Type', /json/)
    .expect(200, function(err, res) {

      t.notOk(err, 'should not error');
      t.equal(res.body.success, true, 'sussess should equal true');

      t.end();
    });
});

test('should return user not found', function(t) {

  var username = 'nonExistantUser';
  var password = 'testpassword';

  request.post('/signin')
    .send({
      username: username,
      password: password
    })
    .set('Accept', 'application/json') // another test that accepts html
    .expect(200, function(err, res) { // perhaps we should be returning 404 notFound http status

      t.notOk(err, 'should not error');
      t.equal(res.body.success, false, 'sussess should equal false');
      t.equal(res.body.message, 'Authentication failed. User password combination not found. (user not found)', 'should return correct error message');

      t.end();
    });
});

test('should return user not foundx', function(t) {

  var username = 'existingUser';
  var password = 'nonExistantPassword';

  request.post('/signin')
    .send({
      username: username,
      password: password
    })
    .set('Accept', 'application/json') // another test that accepts html
    .expect('Content-Type', /json/)
    .expect(200, function(err, res) {
      should.not.exist(err);
      // console.log(res.body);
      res.body.should.have.property('success', false);
      res.body.should.have.property('message', 'Authentication failed. User password combination not found. (pwd not found)');

      t.end();
    });
});


//
// xit('should render a new user in HTML', function(done) {
//
//   var username = 'testusername';
//   var email = 'testemail@test.com';
//   var password = 'testpassword';
//
//   request.post('/users')
//     .send({
//       username: username,
//       email: email,
//       password: password
//     })
//     .set('Accept', 'text/html')
//     .expect('Content-Type', /html/)
//     .expect(200, function(err, res) {
//       // should.not.exist(err);
//
//       console.log(res, 'created');
//
//       done();
//     });
// });
