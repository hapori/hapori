var bookshelf = require('hapori-bookshelf');
var method = require('./methods');

var User = bookshelf.Model.extend({
  tableName: 'users'
}, {

  signin: method.signin
});

module.exports = User;
