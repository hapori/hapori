var Post = require('../../models/post');
var Vote = require('../../models/vote');
var random = require('../../helpers/random');
var cole = require('../../db/co_log_err.js').cole;

var request = require('superagent');
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);

module.exports = function(req, res, next) {
    cole(function* () {

    	var now = new Date().getTime()

	    var embedly = yield agent('GET', 'http://api.embed.ly/1/oembed?key='+process.env.EMBEDLY_KEY+'&url='+req.body.url);

    	// create post
		var post = {
			postKey: random.generate(), // random 10 char string
			title: req.body.title,
			text: req.body.text,
			url: req.body.url,
			timestamp: now,
			forum: 'TODO',
			investors: [req.user.username],
			investment: process.env.VOTE_COST,
			username: req.user.username,
			html: embedly.body.html,
			thumbnail: embedly.body.thumbnail_url,
			commentCount: 0,
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
