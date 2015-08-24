var test = require('tape');
var request = require('supertest');
var app = require('../../../app.js');
var cole = require('../../../db/co_log_err.js').cole;

var bookshelf = require('../../../lib/bookshelf')
var User = require('../../../models/user');
var Post = require('../../../models/post');
var Forum = require('../../../models/forum');
var Vote = require('../../../models/vote');
var Payment = require('../../../models/payment');



test('show homepage', function(t) {
request(app)
  .get('/')
  .expect('Content-Type', 'text/html; charset=utf-8')
  .expect(200)
  .end(function(err, res){

    t.error(err);
    t.end();    

  });
});


test('show forum', function(t) {
request(app)
  .get('/vids')
  .expect('Content-Type', 'text/html; charset=utf-8')
  .expect(200)
  .end(function(err, res){

    t.error(err);
    t.end();    

  });
});


// delete the paymentUser
test('teardown forum tests', function (t) {
  cole(function*() {

    yield bookshelf.knex('users').truncate()
    yield bookshelf.knex('posts').truncate()
    yield bookshelf.knex('forums').truncate()
    yield bookshelf.knex('votes').truncate()
    yield bookshelf.knex('payments').truncate()

    t.end()
  });
});
