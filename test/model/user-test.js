var User = require('../../models/user.js');
var should = require('chai').should();
var expect = require('chai').expect;

describe.only('test user', function() {

  var user = {
    username: 'usertestuser',
    email: 'usertestuser@test.com',
    passwordHash: 'testpassword',
    salt: 'salt',
    balance: 1000,
    key: 'some bitcoin key',
    address: '15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE',
    joined: '1827369128'
  };

  it('create', function(done) {
    User.forge(user).save().then(function() {
      done();
    });
  });

  it('findByAddress', function(done) {

    User.where({
        address: user.address
      })
      .fetch()
      .then(function(_user) {

        _user = _user.attributes;
        expect(_user.username).to.equal(user.username);

        done();

      }).catch(function(err) {
        throw err;
      });
  });

  after(function(done) {

    User.where({
        address: user.address
      })
      .fetch()
      .then(function(_user) {
        _user.destroy();

        done();

      }).catch(function(err) {
        should.not.exist(err);
        throw err;
      });
  });
});
