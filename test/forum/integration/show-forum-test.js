var test = require('tape');
var request = require('supertest');
var app = require('../../../app.js');



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