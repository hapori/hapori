var errors = require('hapori-errors');
var Promise = require('bluebird');
var crypto = require('crypto');

module.exports = function signin(username, password) {
  var user;
  var self = this;

  if (!username || !password) {
    return Promise.reject(new errors.AuthenticationError('no username or password')); //TODO write a proper missing field error
  }

  return self
    .forge({ username: username })
    .fetch()
    .then(function then(_user) {
      if (!_user) {
        return Promise.reject(new errors.AuthenticationError({
          success: false,
          message: 'Authentication failed. User/password combination not found.'
        }));
      }

      user = _user;

      return user.get('passwordHash') === crypto.createHash('sha256').update(user.get('salt') + ':' + password).digest('base64')
    })
    .then(function then(matched) {
      if (!matched) {
        return Promise.reject(new errors.AuthenticationError({
          success: false,
          message: 'Authentication failed. User/password combination not found.'
        }));
      }

      return user;
    })
};
