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

var user1 = user2 = null



// store paymentUser in db
test('setup post create tests', function (t) {
  cole(function*() {

  	// store test users in db
    user1 = yield User.forge(fixtures.users.testUser1).save();
    user2 = yield User.forge(fixtures.users.testUser2).save();

    t.end()

  });
});






test('submit post nr1', function(t) {

	request(app)
		.post('/submitPost')
		// authenticate user as testUser2
		.set('Cookie', [fixtures.tokens.testUser1Token])
		.send(fixtures.req.createPost1Request)
		.expect(200)
		.end(function(err, res){

			cole(function*() {

				post1 = yield Post.where({url: fixtures.req.createPost1Request.url}).fetch()
				vote1 = yield Vote.where({postId: post1.get('id')}).fetch()

				// check absense of errors
				t.error(err, 'no Error')
				t.ok(res.body.success, 'success')
				t.ok(post1, 'post exists')
				t.ok(vote1, 'post exists')

				// test vote
				t.equal(vote1.get('postId'), post1.get('id'), 'postId set correctly')
				t.equal(vote1.get('userId'), user1.get('id'), 'userId set correctly')

				// test post
				t.ok(post1.get('title') == fixtures.req.createPost1Request.title, 'title set correctly')
				t.ok(post1.get('text') == fixtures.req.createPost1Request.text, 'text set correctly')


				// check user id
				
				var modifiedUser1 = yield User.where({id: user1.get('id')}).fetch()

				// check that 
				t.equal(modifiedUser1.get('balance'), user1.get('balance'), 'users balance unchanged')
				t.end()
			});

		});
});




test('submit post nr2', function(t) {

	request(app)
		.post('/submitPost')
		// authenticate user as testUser2
		.set('Cookie', [fixtures.tokens.testUser2Token])
		.send(fixtures.req.createPost2Request)
		.expect(200)
		.end(function(err, res){

			cole(function*() {

				post2 = yield Post.where({url: fixtures.req.createPost2Request.url}).fetch()
				vote2 = yield Vote.where({postId: post2.get('id')}).fetch()

				// check absense of errors
				t.error(err, 'no Error')
				t.ok(res.body.success, 'success')
				t.ok(post2, 'post exists')
				t.ok(vote2, 'post exists')

				// test vote
				t.equal(vote2.get('postId'), post2.get('id'), 'postId set correctly')
				t.equal(vote2.get('userId'), user2.get('id'), 'userId set correctly')

				// test post
				t.ok(post2.get('title') == fixtures.req.createPost2Request.title, 'title set correctly')
				t.ok(post2.get('text') == fixtures.req.createPost2Request.text, 'text set correctly')


				// check user id
				
				var modifiedUser2 = yield User.where({id: user2.get('id')}).fetch()

				// check that 
				t.equal(modifiedUser2.get('balance'), user2.get('balance'), 'users balance unchanged')
				t.end()
			});

		});
});




// delete the paymentUser
test('teardown signin tests', function (t) {
  cole(function*() {

    yield bookshelf.knex('users').truncate()
    yield bookshelf.knex('posts').truncate()
    yield bookshelf.knex('forums').truncate()
    yield bookshelf.knex('votes').truncate()
    yield bookshelf.knex('payments').truncate()

    t.end()
  });
});


