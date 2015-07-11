var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : 'localhost',
    user     : 'roland',
    password : 'postgres',
    database : 'BitcoinReddit',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
