var Vote = require('../../models/vote');
var Post = require('../../models/post');
var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var format = require('../../helpers/format');



module.exports = function(req, res, next) {
    cole(function* () {

    	// the post that is being upvoted
		var post = yield Post.where({id: req.body.postId}).fetch()

		// the user that upvoted
	    var user = yield User.where({ secret: req.auth.secret }).fetch()

		// if the user is broke respond with an error
		if(user.get('balance') < process.env.VOTE_COST) {
			return res.json({
				success: false,
				message: 'Sorry mate, you can\'t vote, you\'re broke'
			});
		}

		// if user isn't broke, allow the user to vote
		// decrease balance of voting user and save to db
		user.set('balance', user.get('balance')-process.env.VOTE_COST)
		yield user.save()

		// the users that have previously upvoted
		var previousVotes = yield Vote.where({postId: post.get('id)')}).fetchAll()
		// users that upvoted previously and the submitter
		var previousInvestorIds = previousVotes.toJSON().map(vote => vote.userId)
		var investors = yield User.query('where', 'id', 'in', previousInvestorIds).fetchAll()
		var investorGain = Math.floor(process.env.VOTE_COST / previousVotes.length)

		// increase balance of previous investors
		_.each(previousVotes.models, vote => {
			_.each(investors.models, investor => {
				
				// update the balance of all previous investors
				if(vote.get('userId') == investor.get('id')) 
					investor.set('balance', investor.get('balance') + investorGain)

				// update the balance of the user
				// note that the user might be one of the investors
				// we do not store the user object back to the db after this point
				// we use the users balance only to report back to the client
				if(vote.get('userId') == user.get('id')) 
					user.set('balance', user.get('balance') + investorGain)

			})
		})
		
		// save all investors
		investors.mapThen(investor => {
			cole(function* () {
				yield investor.save()
			});
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
		yield Vote.forge(vote).save()

		res.json({
			success: true,
			postId: post.get('id'),
			balance: user.get('balance'),
			investment: post.get('investment'),
			investors: format.investorList(post.get('investors')),
		});

	});
};
