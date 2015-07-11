var User = require('../../models/user.js');
// var should = require('chai').should();
var should = require('should');
var cole = require('../../db/co_log_err.js').cole;


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
    User.forge(user).save().then(done);
  });

  //
  it('findByAddress', function(done) {


    User.where({
        address: user.address
      })
      .fetch()
      .then(function(user) {

        // user.attributes.should.have.properties({
        //   username: 'usertestuser'
          // email: 'usertestuser@test.com',
          // passwordHash: 'testpassword',
          // salt: 'salt',
          // key: 'some bitcoin key',
          // address: '15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE',
          // balance: 1000,
          // joined: '1827369128'
        // });

        console.log(user.attributes);
        done();

      }).catch(function(err) {
        should.not.exist(err);
        done();
      });

    // cole(function* () {
    //   var foundUser = yield User.findByAddress(user.address);
    //   done();
    // })

  });
  //
  // after(function(done){
  //   cole(function* () {
  //     yield User.remove({ username: user.username });
  //     done();
  //   })
  // })



});
