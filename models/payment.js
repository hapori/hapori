var bookshelf = require('../lib/bookshelf');

var Payment = bookshelf.Model.extend({
    tableName: 'payments'
}, {

});

module.exports = Payment;
