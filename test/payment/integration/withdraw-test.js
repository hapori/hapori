// https://coderwall.com/p/8if09q/settings-cookies-for-supertest

var test = require('tape');
var request = require('supertest');
var superagent = require('superagent');
var config = require('../../../config')
var bitcoinMath = require('bitcoin-math')

var app = require('../../../app.js');
var fixtures = require('../../fixtures');
var cole = require('../../../db/co_log_err.js').cole;

var User = require('../../../models/user');
var paymentUser = null

var Payment = require('../../../models/payment');
var payment = null

// testpassword

// store paymentUser in db
test('setup signin tests', function (t) {
  cole(function*() {
    user = yield User.forge(fixtures.users.testUser).save();
    t.end()
  });
});





test('withdraw < min withdraw', function(t) {

	var req = JSON.parse(JSON.stringify(fixtures.req.withdrawRequest))
	req.amount = (config.payment.minWithdraw - 1).toBitcoin()

	request(app)
		.post('/withdraw')
		.set('Cookie', [fixtures.tokens.testUserToken])
		.send(req)
		.expect(200)
		.end(function(err, res){

			cole(function*() {

				t.error(err, 'no Error')
				t.equal(res.body.errorCode, 'W001', 'error code ok')
				modifiedUser = yield User.where({id: user.get('id')}).fetch()
				t.equal(modifiedUser.get('balance'), user.get('balance'), 'balance unchanged')
				t.end()

			});

		});
});



test('balance < withdraw', function(t) {

	var satoshiAmount = user.get('balance') + 1
	var req = JSON.parse(JSON.stringify(fixtures.req.withdrawRequest))
	req.amount = satoshiAmount.toBitcoin()

	request(app)
		.post('/withdraw')
		.set('Cookie', [fixtures.tokens.testUserToken])
		.send(req)
		.expect(200)
		.end(function(err, res){

			cole(function*() {

				t.error(err, 'no Error')
				t.equal(res.body.errorCode, 'W002', 'error code ok')
				modifiedUser = yield User.where({id: user.get('id')}).fetch()
				t.equal(modifiedUser.get('balance'), user.get('balance'), 'balance unchanged')
				t.end()

			});

		});
});



test('invalid address', function(t) {

	var satoshiAmount = config.payment.minWithdraw + 1
	var req = JSON.parse(JSON.stringify(fixtures.req.withdrawRequest))
	req.amount = satoshiAmount.toBitcoin()
	req.address = 'not-a-bitcoin-addy'

	request(app)
		.post('/withdraw')
		.set('Cookie', [fixtures.tokens.testUserToken])
		.send(req)
		.expect(200)
		.end(function(err, res){

			cole(function*() {

				t.error(err, 'no Error')
				t.equal(res.body.errorCode, 'W003', 'error code ok')
				modifiedUser = yield User.where({id: user.get('id')}).fetch()
				t.equal(modifiedUser.get('balance'), user.get('balance'), 'balance unchanged')
				t.end()

			});

		});
});



test('min withdraw < withdraw < balance', function(t) {

	var satoshiAmount = config.payment.minWithdraw + 1
	var req = JSON.parse(JSON.stringify(fixtures.req.withdrawRequest))
	req.amount = satoshiAmount.toBitcoin()

	request(app)
		.post('/withdraw')
		.set('Cookie', [fixtures.tokens.testUserToken])
		.send(req)
		.expect(201)
		.end(function(err, res){

			cole(function*() {

				t.error(err, 'no Error')
				t.ok(typeof res.body.errorCode === "undefined", 'no error code')
				modifiedUser = yield User.where({id: user.get('id')}).fetch()
				t.equal(modifiedUser.get('balance'), user.get('balance')-satoshiAmount, 'balance updated')
				t.end()

			});

		});
});








// delete the paymentUser
test('teardown signin tests', function (t) {
  cole(function*() {
//    yield User.forge(paymentUser).destroy()
//    yield Payment.forge(payment).destroy()

    yield user.destroy()
    t.end()
  });
});



