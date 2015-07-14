var Vote = require('../../models/vote');
var Post = require('../../models/post');
var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;
var _ = require('underscore')

module.exports = function(req, res, next) {
    cole(function* () {

    	// the post that is being upvoted
    	var postId = req.body.postId
		var post = yield Post.where({id: postId}).fetch()

		// the user that upvoted
		var userId = req.user.id
		var user = yield User.where({id: userId}).fetch()

		// the users that have previously upvoted
		var previousVotes = yield Vote.where({postId: postId}).fetchAll()
		var previousInvestorIds = previousVotes.toJSON().map(vote => vote.userId)
		var investors = yield User.query('where', 'id', 'in', previousInvestorIds).fetchAll()


		// decrease balance of voting user
		user.set('balance', user.get('balance')-process.env.VOTE_COST)
		yield user.save()

				console.log('previousVotes', previousVotes, 'investors', investors)


		_.each(previousVotes.toJSON(), function(vote) {
			_.each(investors.toJSON(), function(investor) {
				console.log('vote', vote, 'investor', investor)
			})
		})
/*
		// increase balance of investors
		for(var voteIndex = 0; voteIndex < previousVotes.toJSON().length; voteIndex++) {
			for(var investorIndex = 0; investorIndex < investors.toJSON().length; investorIndex++) {
				if(previousVotes[voteIndex].userId === investors[investorIndex].id) {

					investors[investorIndex].balance += Math.floor(process.env.VOTE_COST / previousVotes.length)
					yield User.update(investors[investorIndex], 'id') // this can be optimized if a user can vote multiple times

				}
			}
		}

		// increase investment in the post, add new investor, and save
		post.investment += parseInt(process.env.VOTE_COST)
		post.investors.push(user.username)
		yield Post.update(post, 'id')

		yield Vote.create({postId: postId, userId: userId, timestamp: new Date().getTime()})

		res.json({
			success: true,
			postId: postId,
			balance: user.balance,
			investment: post.investment,
			investors: post.investors
		});
*/

		res.json({
			success: true,
			postId: 1,
			balance: 12,
			investment: 14,
			investors: []			
		})
	});
};
