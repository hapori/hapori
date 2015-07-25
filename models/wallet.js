var bookshelf = require('../lib/bookshelf');

var Wallet = bookshelf.Model.extend({
    tableName: 'wallet' // why singular?
}, {

});

module.exports = Wallet;
