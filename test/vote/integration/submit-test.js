// https://coderwall.com/p/8if09q/settings-cookies-for-supertest

var test = require('tape');
var request = require('supertest');
var superagent = require('superagent');
var config = require('../../../config')
var bitcoinMath = require('bitcoin-math')
var _ = require('lodash');

var app = require('../../../app.js');
var fixtures = require('../../fixtures');
var cole = require('../../../db/co_log_err.js').cole;

var format = require('../../../helpers/format.js')

var bookshelf = require('../../../lib/bookshelf')
var User = require('../../../models/user');
var Post = require('../../../models/post');
var Forum = require('../../../models/forum');
var Vote = require('../../../models/vote');
var Payment = require('../../../models/payment');

var user1 = user2 = user3 = null
var user1AfterVote1 = user1AfterVote2 = user1AfterVote3
	= user2AfterVote2 = user2AfterVote3
	= user3AfterVote3 = null
var post1AfterVote1 = post1AfterVote2 = post1AfterVote3 = null
var post1 = null
var vote = null

const VOTE_COST = process.env.VOTE_COST


// first testUser1 submits a post and casts the implicite vote
// then testUser2 casts a vote
// then testUser1 casts a vote
// then testUser3 casts a vote


// this prepares the db as if testUser1 had submitted testUser1Post
test('setup vote submit tests: testUser1 submits a post and casts the implicite vote', function (t) {
  cole(function*() {

  	// store test users in db
    user1 = yield User.forge(fixtures.users.testUser1).save();
    user2 = yield User.forge(fixtures.users.testUser2).save();
    user3 = yield User.forge(fixtures.users.testUser3).save();

    // save a post, submitted by testUser1
    post1 = yield Post.forge(fixtures.posts.testUser1Post).save();
    defaultVote = yield Vote.forge(fixtures.votes.vote1).save();

    t.end()

  });
});





// now testUser2 votes on testUser1Post
test('testUser2 submits first vote', function(t) {

	var req = JSON.parse(JSON.stringify(fixtures.req.submitVote1Request))
	req.postId = post1.get('id')

	request(app)
		.post('/vote')
		// authenticate user as testUser2
		.set('Cookie', [fixtures.tokens.testUser2Token])
		.send(req)
		.expect(200)
		.end(function(err, res){

			cole(function*() {

				var vote = _.last((yield Vote.query(q=>q.orderBy('id', 'asc')).fetchAll()).models)
//				var vote = yield Vote.where({id:2}).fetch()

				// check absense of errors
				t.error(err, 'no Error')
				t.ok(res.body.success, 'success')
				t.ok(typeof vote.get('timestamp') != "undefined", 'timestamp set')

				// check vote
				t.equal(vote.get('userId'), user2.get('id'), 'userId is ok')
				t.equal(vote.get('postId'), post1.get('id'), 'postId is ok')
				
				// check users
				user1AfterVote1 = yield User.where({id: user1.get('id')}).fetch()
				user2AfterVote1 = yield User.where({id: user2.get('id')}).fetch()
				t.equal(user1AfterVote1.get('balance'), parseInt(user1.get('balance'))+parseInt(VOTE_COST), 'user1 gained 1 vote cost')
				t.equal(user2AfterVote1.get('balance'), parseInt(user2.get('balance'))-parseInt(VOTE_COST), 'user2 lost 1 vote cost')

				// check post
				post1AfterVote1 = yield Post.where({id: post1.get('id')}).fetch()
				t.deepEqual(post1AfterVote1.get('investors'), [user1.get('username'), user2.get('username')], 'investors ok')
				t.equal(post1AfterVote1.get('investment'), parseInt(post1.get('investment'))+parseInt(VOTE_COST), 'voter added to investors')

				// check formatted investor string
				t.equal(format.investorList(post1AfterVote1.get('investors')).toJSON(), 
						'testUser1 '+format.satoshi(VOTE_COST)+'(+'+format.satoshi(VOTE_COST)+') '+
						'testUser2 '+format.satoshi(VOTE_COST)+'(-'+format.satoshi(VOTE_COST)+') ',
						'formatted investor list ok')

				var keys = ['postKey', 'title', 'text', 'url', 'username', 'commentCount', 'html', 'thumbnail', 'sticky']
				keys.forEach(key => t.equal(post1AfterVote1.get(key), post1.get(key), key+' has not changed'))


				t.end()
			});

		});
});








// now testUser1 votes on testUser1Post
test('testUser1 submits second vote', function(t) {

	var req = JSON.parse(JSON.stringify(fixtures.req.submitVote1Request))
	req.postId = post1.get('id')

	request(app)
		.post('/vote')
		// authenticate user as testUser2
		.set('Cookie', [fixtures.tokens.testUser1Token])
		.send(req)
		.expect(200)
		.end(function(err, res){

			cole(function*() {

				var vote = _.last((yield Vote.query(q=>q.orderBy('id', 'asc')).fetchAll()).models)
//				var vote = yield Vote.where({id:3}).fetch()

				// check absense of errors
				t.error(err, 'no Error')
				t.ok(res.body.success, 'success')


				t.ok(typeof vote.get('timestamp') != "undefined", 'timestamp set')

				// check vote
				t.equal(vote.get('userId'), user1.get('id'), 'userId is ok')
				t.equal(vote.get('postId'), post1.get('id'), 'postId is ok')
				
				// check users
				user1AfterVote2 = yield User.where({id: user1.get('id')}).fetch()
				user2AfterVote2 = yield User.where({id: user2.get('id')}).fetch()

				t.equal(user1AfterVote2.get('balance'), parseInt(user1AfterVote1.get('balance'))-parseInt(VOTE_COST/2), 'user1 lost 1/2 vote cost')
				t.equal(user2AfterVote2.get('balance'), parseInt(user2AfterVote1.get('balance'))+parseInt(VOTE_COST/2), 'user2 gained 1/2 vote cost')

				// check post
				post1AfterVote2 = yield Post.where({id: post1.get('id')}).fetch()
				t.deepEqual(post1AfterVote2.get('investors'), [user1.get('username'), user2.get('username'), user1.get('username')], 'investors ok')
				t.equal(post1AfterVote2.get('investment'), parseInt(post1AfterVote1.get('investment'))+parseInt(VOTE_COST), 'voter added to investors')

				// check formatted investor string
				t.equal(format.investorList(post1AfterVote2.get('investors')).toJSON(), 
						'testUser1 '+format.satoshi(VOTE_COST*2)+'(+'+format.satoshi(VOTE_COST/2)+') '+
						'testUser2 '+format.satoshi(VOTE_COST)+'(-'+format.satoshi(VOTE_COST/2)+') ',
						'formatted investor list ok')

				var keys = ['postKey', 'title', 'text', 'url', 'username', 'commentCount', 'html', 'thumbnail', 'sticky']
				keys.forEach(key => t.equal(post1AfterVote1.get(key), post1.get(key), key+' has not changed'))

				t.end()
			});

		});
});









// now testUser1 votes on testUser1Post
test('testUser3 submits third vote', function(t) {

	var req = JSON.parse(JSON.stringify(fixtures.req.submitVote1Request))
	req.postId = post1.get('id')

	request(app)
		.post('/vote')
		// authenticate user as testUser2
		.set('Cookie', [fixtures.tokens.testUser3Token])
		.send(req)
		.expect(200)
		.end(function(err, res){

			cole(function*() {

				var vote = _.last((yield Vote.query(q=>q.orderBy('id', 'asc')).fetchAll()).models)
//				var vote = yield Vote.where({id:4}).fetch()

				// check absense of errors
				t.error(err, 'no Error')
				t.ok(res.body.success, 'success')
				t.ok(typeof vote.get('timestamp') != "undefined", 'timestamp set')

				// check vote
				t.equal(vote.get('userId'), user3.get('id'), 'userId is ok')
				t.equal(vote.get('postId'), post1.get('id'), 'postId is ok')
				
				// check users
				user1AfterVote3 = yield User.where({id: user1.get('id')}).fetch()
				user2AfterVote3 = yield User.where({id: user2.get('id')}).fetch()
				user3AfterVote3 = yield User.where({id: user3.get('id')}).fetch()

				t.equal(user1AfterVote3.get('balance'), parseInt(user1AfterVote2.get('balance'))+Math.floor(VOTE_COST*(2/3)), 'user1 gained 2/3 vote cost')
				t.equal(user2AfterVote3.get('balance'), parseInt(user2AfterVote2.get('balance'))+Math.floor(VOTE_COST*(1/3)), 'user2 gained 1/3 vote cost')
				t.equal(user3AfterVote3.get('balance'), parseInt(user3.get('balance'))-Math.floor(VOTE_COST), 'user3 lost 1 vote cost')

				// check post
				post1AfterVote3 = yield Post.where({id: post1.get('id')}).fetch()
				t.deepEqual(post1AfterVote3.get('investors'), [user1.get('username'), user2.get('username'), user1.get('username'), user3.get('username')], 'investors ok')
				t.equal(post1AfterVote3.get('investment'), parseInt(post1AfterVote2.get('investment'))+parseInt(VOTE_COST), 'voter added to investors')

				// check formatted investor string
				t.equal(format.investorList(post1AfterVote3.get('investors')).toJSON(), 
						'testUser1 '+format.satoshi(VOTE_COST*2)+'(+'+format.satoshi(Math.floor(VOTE_COST/2+VOTE_COST*(2/3)))+') '+
						'testUser2 '+format.satoshi(VOTE_COST)+'(-'+format.satoshi(Math.ceil(VOTE_COST/2-VOTE_COST*(1/3)))+') ' +
						'testUser3 '+format.satoshi(VOTE_COST)+'(-'+format.satoshi(VOTE_COST)+') ',
						'formatted investor list ok')

				t.equal(user1AfterVote3.get('balance'), user1.get('balance')+Math.floor(VOTE_COST/2+VOTE_COST*(2/3)), 'delta balance user1 ok')
				t.equal(user2AfterVote3.get('balance'), user2.get('balance')-Math.ceil(VOTE_COST/2-VOTE_COST*(1/3)), 'delta balance user2 ok')
				t.equal(user3AfterVote3.get('balance'), user3.get('balance')-VOTE_COST, 'delta balance user3 ok')

				var keys = ['postKey', 'title', 'text', 'url', 'username', 'commentCount', 'html', 'thumbnail', 'sticky']
				keys.forEach(key => t.equal(post1AfterVote3.get(key), post1.get(key), key+' has not changed'))

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


