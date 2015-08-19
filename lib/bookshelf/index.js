var config = require('../../config')
var prod = config.env == 'production'

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: prod ? process.env.DB_HOST : 'localhost',
    user: prod ? process.env.DB_USER : 'clemensley',
    password: prod ? process.env.DB_PASSWORD : 'postgres',
    database: prod ? process.env.DB_DATABASE : 'BitcoinReddit',
    port: prod ? process.env.DB_PORT : '5432',
    ssl: prod ? true : false,
    charset: 'utf8',
  }
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
