var bookshelf = require('hapori-bookshelf');

var Post = bookshelf.Model.extend({
    tableName: 'posts'
}, {

});

module.exports = Post;
