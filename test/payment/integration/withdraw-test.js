// https://coderwall.com/p/8if09q/settings-cookies-for-supertest

var test = require('tape');
var request = require('supertest');
var superagent = require('superagent');
var config = require('../../../config')
var bitcoinMath = require('bitcoin-math')

var app = require('../../../app.js');
var fixtures = require('../../fixtures');
var cole = require('../../../db/co_log_err.js').cole;

var bookshelf = require('../../../lib/bookshelf')
var User = require('../../../models/user');
var Post = require('../../../models/post');
var Forum = require('../../../models/forum');
var Vote = require('../../../models/vote');
var Payment = require('../../../models/payment');

var user = null

// testpassword

// store user in db
test('setup withdraw tests', function (t) {
  cole(function*() {
    user = yield User.forge(fixtures.users.testUser1).save();
    t.end()
  });
});





test('withdraw < min withdraw', function(t) {

	var req = JSON.parse(JSON.stringify(fixtures.req.withdrawRequest))
	req.amount = (config.payment.minWithdraw - 1).toBitcoin()

	request(app)
		.post('/withdraw')
		.set('Cookie', [fixtures.tokens.testUser1Token])
		.send(req)
		.expect(200)
		.end(function(err, res){

			cole(function*() {

				t.error(err, 'no Error')
				t.equal(res.body.errorCode, 'W001', 'error code ok')
				var modifiedUser = yield User.where({id: user.get('id')}).fetch()
				t.ok(modifiedUser.get('balance') == user.get('balance'), 'balance unchanged')
				t.end()

			});

		});
});



test('balance < withdraw', function(t) {

	var satoshiAmount = user.get('balance') + 1
	var req = JSON.parse(JSON.stringify(fixtures.req.withdrawRequest))
	req.amount = parseInt(satoshiAmount).toBitcoin()

	request(app)
		.post('/withdraw')
		.set('Cookie', [fixtures.tokens.testUser1Token])
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
		.set('Cookie', [fixtures.tokens.testUser1Token])
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
		.set('Cookie', [fixtures.tokens.testUser1Token])
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








test('teardown withdraw tests', function (t) {
  cole(function*() {

    yield bookshelf.knex('users').truncate()
    yield bookshelf.knex('posts').truncate()
    yield bookshelf.knex('forums').truncate()
    yield bookshelf.knex('votes').truncate()
    yield bookshelf.knex('payments').truncate()

    t.end()
  });
});



