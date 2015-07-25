// var knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host     : 'localhost',
//     user     : process.env.POSTGRES_DB_USER || 'roland',
//     password : process.env.POSTGRES_DB_PASSWORD || 'postgres',
//     database : 'BitcoinReddit',
//     charset  : 'utf8'
//   }
// });

var pg = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
