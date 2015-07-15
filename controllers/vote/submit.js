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

		_.each(previousVotes.models, function(vote) {
			_.each(investors.models, function(investor) {
				if(vote.get('userId') == investor.get('id')) {
					investor.set('balance', investor.get('balance') + Math.floor(process.env.VOTE_COST / previousVotes.length))
					user.save()
					console.log('adding '+Math.floor(process.env.VOTE_COST / previousVotes.length)+' to '+investor.get('username'))
				}
			})
		})


		// increase investment in the post, add new investor, and save
		post.set('investment', post.get('investment') + parseInt(process.env.VOTE_COST))
		post.set('investors', post.get('investors').push(user.username))
		//post.save()
/*
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
