var bookshelf = require('hapori-bookshelf');

var Vote = bookshelf.Model.extend({
  tableName: 'votes'

}, {
  
});

module.exports = Vote;
