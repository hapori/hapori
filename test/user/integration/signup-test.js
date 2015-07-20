var app = require('../../../app');
var request = require('supertest')(app);
var User = require('../../../models/user');
var async = require('async');
var test = require('tape');
const before = test;
const after = test;

before('before', function(t) {

  var user = {
    username: 'existingUser',
    email: 'existingUser@test.com',
    passwordHash: 'testpassword',
    salt: 'salt',
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

test('should signup a new user', function(t) {

  var username = 'signupUser';
  var email = 'signupUser@test.com';
  var password = 'signupUserPassword';

  request.post('/signup')
    .send({
      username: username,
      email: email,
      password: password
    })
    .set('Accept', 'application/json') // another test that accepts html
    .expect('Content-Type', /json/)
    .expect(201, function(err, res) {

      t.notOk(err, 'error should not exist');
      t.ok(res.body.success, 'success should be true');
      // res.body.should.have.property('message', 'Welcome signupUser');
      //        res.body.should.have.property('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNpZ251cFVzZXIiLCJwYXNzd29yZEhhc2giOiJ1bzdoWjNadDk3TFc0QUJSWGZ6dXBJcGIwaGJHYVJVem9qOEJBaGx2eGVNPSIsInNhbHQiOiIxMjQzY2MyNWMxZDg2OTE5MzdiZWEyYTAiLCJlbWFpbCI6InNpZ251cFVzZXJAdGVzdC5jb20iLCJiYWxhbmNlIjowLCJrZXkiOiIwNTI3OTQzZjZjZDVhODE5NDg3OWE2NGFmYTZlODM5NTEwOGE0ODM2OTYyYzc0YWNhNzZjMTUyNWU5NTcxOGY2IiwiYWRkcmVzcyI6IjFISmVpcXllQ2ZhS2E1dUFmRzJSYUF3QW5BVEg3QmJKd1AiLCJqb2luZWQiOjE0MzUzMzA1MTg2NDQsImlhdCI6MTQzNTMzMDUxOCwiZXhwIjoxNDM1NDE2OTE4fQ.zObc-GTO4r-lw4YmzXeKBky_54AE1JG5foYHOM9OeRs');
      t.end();
    });
});

test('should fail correctly if signup posed with missing field', function(t) {

  request.post('/signup')
    .send({
      // missing fields
    })
    .set('Accept', 'application/json') // another test that accepts html
    .expect('Content-Type', /json/)
    .expect(401, function(err, res) {
      t.notOk(err, 'error should not exist');
      t.notOk(res.body.success, 'success should not be true');
      t.equal(res.body.message, 'Missing Fields');

      t.end();
    });
});

test('should not create a new user with existing username', function(t) {

  var username = 'existingUser';
  var email = 'existingUser123@test.com';
  var password = 'signupUserPassword';

  request.post('/signup')
    .send({
      username: username,
      email: email,
      password: password
    })
    .set('Accept', 'application/json') // another test that accepts html
    .expect('Content-Type', /json/)
    .expect(200, function(err, res) {

      t.notOk(err, 'error should not exist');
      t.notOk(res.body.success, 'seccess should be false');
      t.equal(res.body.message, 'Username taken');
      //res.body.should.have.property('command', 'INSERT');
      //res.body.should.have.property('rowCount', 1);
      // todo check passwordHash
      t.end();
    });
});


test('should not create a new user bc password exists', function(t) {

  var username = 'existingUser123';
  var email = 'existingUser@test.com';
  var password = 'signupUserPassword';

  request.post('/signup')
    .send({
      username: username,
      email: email,
      password: password
    })
    .set('Accept', 'application/json') // another test that accepts html
    .expect('Content-Type', /json/)
    .expect(200, function(err, res) {

      t.notOk(err, 'error should not exist');
      t.notOk(res.body.success, '`success` should be false');
      t.equal(res.body.message, 'Email taken', 'check response message');
      //res.body.should.have.property('command', 'INSERT');
      //res.body.should.have.property('rowCount', 1);

      // todo check passwordHash
      t.end();
    });
});

//
// xit('should render a new user in HTML', function(t) {
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
//       t.end();
//     });
// });
