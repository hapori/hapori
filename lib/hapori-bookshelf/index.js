var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    charset  : 'utf8',
    port: process.env.PORT,
    ssl: true
  }
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
