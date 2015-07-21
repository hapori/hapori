var Comment = require('../../models/post');
var random = require('hapori-random');
var cole = require('../../db/co_log_err.js').cole;


module.exports = function(req, res, next) {
    cole(function* () {

		var comment = {
			commentKey: req.body.parentKey+random.generate(),
			postKey: req.body.postKey,
			text: req.body.text,
			investors: [req.user.username],
			investment: process.env.VOTE_COST,
			username: req.user.username,
			timestamp: new Date().getTime(),
		};
		var comment = yield Comment.forge(comment).save()

		res.json({
			success: true,
		});

	});
};
