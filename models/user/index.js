var bookshelf = require('../../lib/bookshelf');
var method = require('./methods');

var User = bookshelf.Model.extend({
  tableName: 'users'
}, {
  signin: method.signin
});

module.exports = User;
