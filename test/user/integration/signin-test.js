var app = require('../../../app');
var request = require('supertest')(app);
var should = require('chai').should();
var cole = require('../../../db/co_log_err.js').cole;
var crypto = require('crypto');

var db = require('../../../db');

describe('User: signin', function() {

  before(function(done) {
    cole(function*() {
      // remove all users before tests so that we can check db after if need be.
      yield db.remove('users', {}); // placeholder while I figure out how to empty a table with bookshelf

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

      yield User.forge(user).save();
      done();
    });
  });

  it('should signin a user', function(done) {

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
        should.not.exist(err);
        res.body.should.have.property('success', true);

        done();
      });
  });


  it('should return user not found', function(done) {

    var username = 'nonExistantUser';
    var password = 'testpassword';

    request.post('/signin')
      .send({
        username: username,
        password: password
      })
      .set('Accept', 'application/json') // another test that accepts html
      .expect(200, function(err, res) { // perhaps we should be returning 404 notFound http status
        should.not.exist(err);
        res.body.should.have.property('success', false);
        res.body.should.have.property('message', 'Authentication failed. User password combination not found. (user not found)');

        done();
      });
  });


  it('should return user not found', function(done) {

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
        res.body.should.have.property('success', false);
        res.body.should.have.property('message', 'Authentication failed. User password combination not found. (pwd not found)');

        done();
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
});
