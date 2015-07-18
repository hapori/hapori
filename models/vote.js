var bookshelf = require('hapori-bookshelf');
var User = bookshelf.Model.extend({ tableName: 'votes' }, {});
module.exports = User;
