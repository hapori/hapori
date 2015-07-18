var Vote = require('../../models/vote');
var Post = require('../../models/post');
var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;
var _ = require('lodash');
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    cole(function* () {

    	// the post that is being upvoted
    	var postId = req.body.postId
		var post = yield Post.where({id: postId}).fetch()

		// the user that upvoted
		var userId = req.user.id
		var user = yield User.where({id: userId}).fetch()

//		console.log('dbuser', user.toJSON())
//		console.log('socketuser', req.user)

		// if the user is broke respond with an error
		if(user.get('balance') < process.env.VOTE_COST) {

			res.json({
				success: false,
				message: 'Sorry mate, you can\'t vote, you\'re broke'
			});

		// if user isn't broke, allow the user to vote
		} else {

			// decrease balance of voting user and save to db
			user.set('balance', user.get('balance')-process.env.VOTE_COST)
			yield user.save()

			// the users that have previously upvoted
			var previousVotes = yield Vote.where({postId: postId}).fetchAll()
			var previousInvestorIds = previousVotes.toJSON().map(vote => vote.userId)
			var investors = yield User.query('where', 'id', 'in', previousInvestorIds).fetchAll()
			var investorGain = Math.floor(process.env.VOTE_COST / previousVotes.length)

			// increase balance of previous investors
			_.each(previousVotes.models, function(vote) {
				_.each(investors.models, function(investor) {
					// update the balance of all previous investors
					if(vote.get('userId') == investor.get('id'))
						investor.set('balance', investor.get('balance') + investorGain)
				})
			})
			// save all investors
			investors.mapThen(function(investor) {
				return investor.save()
			})

			// increase investment in the post, add new investor, and save
			post.set('investment', post.get('investment') + parseInt(process.env.VOTE_COST))
			post.set('investors', post.get('investors').concat([user.get('username')]))
			yield post.save()

			// create new vote and save
			var vote = {
				userId: user.get('id'),
				postId: post.get('id'),
				timestamp: new Date().getTime()
			}
			Vote.forge(vote).save()

			// the user that upvoted
			var userId = req.user.id
			var user = yield User.where({id: userId}).fetch()

			// create a new token with updated balance and store it in the cookie
			var token = jwt.sign(user, process.env.JWT_SECRET, { expiresInMinutes: 1440 });
		    res.cookie('token', token, { httpOnly: true });

			res.json({
				success: true,
				postId: postId,
				balance: user.get('balance'),
				investment: post.get('investment'),
				investors: post.get('investors')
			});
		}

	});
};
