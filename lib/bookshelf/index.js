var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    charset  : 'utf8',
    port: process.env.DB_PORT,
    ssl: true
  }
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
