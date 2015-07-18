var bookshelf = require('hapori-bookshelf');

var Forum = bookshelf.Model.extend({
    tableName: 'forums'
}, {

});

module.exports = Forum;
