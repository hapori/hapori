var db = require('../db');

var bookshelf = require('../bookshelf.js');

var User = bookshelf.Model.extend({
  tableName: 'users'
}, {


 //  login: Promise.method(function(email, password) {
 //   if (!email || !password) throw new Error('Email and password are both required');
 //   return new this({email: email.toLowerCase().trim()}).fetch({require: true}).tap(function(customer) {
 //     return bcrypt.compareAsync(customer.get('password'), password);
 //   });
 // })


});

module.exports = User;

//
// exports.create = function (user, client) {
//     return db.insert('users', user, client)
// };
//
// exports.find = function (query, client) {
//     return db.find('users', query,  client)
// };
//
// exports.findAll = function (client) {
//     return db.find('users', {}, client)
// };
//
// exports.findById = function (id, client) {
//     return db.find('users', { id:id },  client)
// };
//
// exports.findByIds = function (ids, client) {
//     return db.findWhereIn('users', 'id', ids,  client)
// };
//
// exports.findByAddress = function (address, client) {
//     return db.find('users', { address:address },  client)
// };
//
// exports.findByName = function (username, client) {
//     return db.find('users', { username:username },  client)
// };
//
// exports.findByEmail = function (username, client) {
//     return db.find('users', { username:username },  client)
// };
//
// User.remove = function (query, client) {
//     return db.remove('users', query, client)
// };
//
// exports.update = function (user, dbKey, client) {
//     return db.update('users', user, dbKey, client)
// };
