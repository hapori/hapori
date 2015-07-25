var bookshelf = require('../lib/bookshelf');

var Vote = bookshelf.Model.extend({
  tableName: 'votes'

}, {

});

module.exports = Vote;
