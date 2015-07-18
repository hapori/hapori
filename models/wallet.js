var bookshelf = require('hapori-bookshelf');

var Wallet = bookshelf.Model.extend({
    tableName: 'wallet' // why singular?
}, {

});

module.exports = Wallet;
