var Post = require('../../models/post');
var Vote = require('../../models/vote');
var cole = require('../../db/co_log_err.js').cole;


module.exports = function(req, res, next) {
    cole(function* () {

    	var now = new Date().getTime()

    	// create post
		var post = {
			postKey: (Math.random().toString(36)+'00000000000000000').slice(2, 12), // random 10 char string
			title: req.body.title,
			text: req.body.text,
			url: req.body.url,
			timestamp: now,
			forum: 'TODO',
			investors: [req.user.username],
			investment: process.env.VOTE_COST,
			username: req.user.username,
		};
		var post = yield Post.forge(post).save()
   
   		// create vote
		var vote = {
			userId: req.user.id,
			postId: post.get('id'),
			timestamp: now
		}
		Vote.forge(vote).save()


		res.json({
			success: true,
		});

	});
};
