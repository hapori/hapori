var Comment = require('../../models/comment');
var Post = require('../../models/post');
var random = require('../../helpers/random');
var cole = require('../../db/co_log_err.js').cole;


module.exports = function(req, res, next) {
    cole(function* () {

		var comment = {
			commentKey: req.body.parentKey+"."+random.generate(4),
			postKey: req.body.postKey,
			text: req.body.text,
			investors: [req.user.username],
			investment: process.env.VOTE_COST,
			username: req.user.username,
			timestamp: new Date().getTime(),
		};

		yield Comment.forge(comment).save()

		var post = yield Post.where({ postKey: req.body.postKey }).fetch();
		post.set('commentCount', post.get('commentCount') + 1)
		yield post.save()

		res.json({
			success: true,
		});
	});
};
