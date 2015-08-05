var test = require('tape');
var request = require('supertest');
var app = require('../../../app.js');



test('post to deposit callback', function(t) {
request(app)
  .post('/deposit/'+process.env.DEPOSIT_CALLBACK)
//  .expect('Content-Type', 'text/html; charset=utf-8')
  .expect(200)
  .end(function(err, res){

    t.error(err);
    t.end();    

  });
});



/*
var app = require('../../../app.js');
var request = require('supertest')(app);
var User = require('../../../models/user');
var fixtures = require('../../fixtures');

var test = require('tape').test;
const before = test;
const after = test;

var user = fixtures.user.default;








test('test', function(t) {

  request.get('/')
    .set('Accept', 'application/json')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200, function(err, res) {


      t.notOk(err, 'should not err');
      //t.equal(res.body.username, username, 'username should match');

      t.end();
    });
});


test('equivalence', function(t) {
    t.equal(1, 1, 'these two numbers are equal');
    t.end();
});
*/











// var app = require('../../../app');
// var request = require('supertest')(app);
// var should = require('chai').should();
// var cole = require('../../../db/co_log_err.js').cole;
//
// var fixtures = require('../../fixtures');
//
// describe.only('Payment: create', function() {
//
//   before(function(done){
//     var user = fixtures.user.paymentUser;
//     User.forge(user).save().then(function(){
//       done();
//     });
//   });
//
//   it('should create a new payment', function(done) {
//
//     var notification = {
//         "id": "2837-38f0-j292-29f3",
//         "created_at": "2014-10-20T18:27:16Z",
//         "delivery_attempt": 1,
//         "notification_id": "38220-243858-3848303838",
//         "payload": {
//           "type": "address",
//           "address": "adfbeEyfEET9GqTSF4JpFRHAD8YGpYLbCE",
//           "block_chain": "bitcoin",
//           "sent": 0,
//           "received": 4000,
//           "input_addresses": ["1rBauUT..."],
//           "output_addresses": ["1kf93kf..."],
//           "transaction_hash": "48d4425...",
//           "block_hash": "00000000000004758...",
//           "confirmations": 5
//         }
//       }
//
//     request
//       .post('/deposit')
//       .send(notification)
//       .expect('Content-Type', 'text/plain; charset=utf-8')
//       .expect(200, function(err, res) {
//
//         if (err) throw err;
//
//         should.not.exist(err);
//         (res.text).should.eql('OK\n');
//
//         done();
//
//       });
//
//   });
// });
