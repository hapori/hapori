var Promise = require('bluebird');
var bookshelf = require('../bookshelf.js');
var crypto = require('crypto');

var errors = require('errors');

errors.create({
  name: 'AuthenticationError',
  success: false,
  status: 200
});
// console.log(new errors.RuntimeError().toString());

var User = bookshelf.Model.extend({
  tableName: 'users'
}, {

  signin: function signin(username, password) {
    var user;
    var self = this;

    if (!username || !password) {
      return Promise.reject(new errors.AuthenticationError('no username or password')); //TODO write a proper missing field error
    }

    return self.forge({
        username: username
      })
      .fetch()
      .then(function then(_user) {

        user = _user;

        if (!user) {
          return Promise.reject(new errors.AuthenticationError({
            success: false,
            message: 'Authentication failed. User password combination not found. (user not found)'
          }));
        }

        return user.get('passwordHash') === crypto.createHash('sha256').update(user.get('salt') + ':' + password).digest('base64')

      })
      .then(function then(matched) {

        if (!matched) {
          return Promise.reject(new errors.AuthenticationError({
            success: false,
            message: 'Authentication failed. User password combination not found. (pwd not found)'
          }));
        }

        return user;
      })
  }
});

module.exports = User;
