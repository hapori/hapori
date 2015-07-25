var bookshelf = require('../lib/bookshelf');

var Forum = bookshelf.Model.extend({
    tableName: 'forums'
}, {

});

module.exports = Forum;
