var test = require('tape');
var request = require('supertest');
var app = require('../../../app.js');
var fixtures = require('../../fixtures');
var cole = require('../../../db/co_log_err.js').cole;

var User = require('../../../models/user');
var paymentUser = null

var Payment = require('../../../models/payment');
var payment = null


// store paymentUser in db
test('setup deposit test', function (t) {
  cole(function*() {
    paymentUser = yield User.forge(fixtures.users.paymentUser).save();
    t.end()
  });
});



test('post to deposit callback with 0 confirmation', function(t) {

  var req = JSON.parse(JSON.stringify(fixtures.req.chainCallback))

  request(app)
    .post('/deposit/'+process.env.DEPOSIT_CALLBACK)
    .send(req)
    .expect(200)
    .end(function(err, res){

      t.error(err, 'no Error');
      cole(function*() {
        payment = yield Payment.where({transactionHash: fixtures.req.chainCallback.payload.transaction_hash}).fetch()
        t.equal(payment, null, 'No payment tuple created')
        t.end()
      });

    });
});



test('post to deposit callback with 1 confirmation', function(t) {

  var req = JSON.parse(JSON.stringify(fixtures.req.chainCallback))
  req.payload.confirmations = 1

  request(app)
    .post('/deposit/'+process.env.DEPOSIT_CALLBACK)
    .send(req)
    .expect(200)
    .end(function(err, res){

      t.error(err, 'no Error');
      cole(function*() {

        paymentUser = yield User.where({id: paymentUser.get('id')}).fetch()
        payment = yield Payment.where({transactionHash: fixtures.req.chainCallback.payload.transaction_hash}).fetch()

        // check that the payment tuple is stored correctly
        t.ok(payment, 'Payment tuple added to db')
        t.equal(payment.get('amount'), fixtures.req.chainCallback.payload.received, 'Payment.kind')
        t.equal(payment.get('transactionHash'), fixtures.req.chainCallback.payload.transaction_hash, 'Payment.transactionHash')
        t.equal(payment.get('username'), fixtures.users.paymentUser.username, 'Payment.username')
        t.equal(payment.get('kind'), 'deposit', 'Payment.kind')

        // check that the user balance is updated correctly
        var expectedBalance = parseInt(fixtures.users.paymentUser.balance)+parseInt(fixtures.req.chainCallback.payload.received)
        t.equal(paymentUser.get('balance'), expectedBalance, 'User.balance')

        t.end()
      });

    });
});


test('post to deposit callback with 2 confirmations', function(t) {

  var req = JSON.parse(JSON.stringify(fixtures.req.chainCallback))
  req.payload.confirmations = 1

  request(app)
    .post('/deposit/'+process.env.DEPOSIT_CALLBACK)
    .send(req)
    .expect(200)
    .end(function(err, res){

      t.error(err, 'no Error');
      cole(function*() {

        paymentUser = yield User.where({id: paymentUser.get('id')}).fetch()
        payments = yield Payment.where({transactionHash: fixtures.req.chainCallback.payload.transaction_hash}).fetchAll()

        t.equal(payments.length, 1, 'No new payment tupel created')

        // check that the user balance is updated correctly
        var expectedBalance = parseInt(fixtures.users.paymentUser.balance)+parseInt(fixtures.req.chainCallback.payload.received)
        t.equal(paymentUser.get('balance'), expectedBalance, 'User.balance')

        t.end()
      });

    });
});



// delete the paymentUser
test('teardown deposit tests', function (t) {
  cole(function*() {

    yield paymentUser.destroy()
    yield payment.destroy()

    t.end()
  });
});



