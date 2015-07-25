var bookshelf = require('../lib/bookshelf');

var Post = bookshelf.Model.extend({
    tableName: 'posts'
}, {

});

module.exports = Post;
