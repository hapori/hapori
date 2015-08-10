var Post = require('../../models/post');
var Vote = require('../../models/vote');
var random = require('../../helpers/random');
var cole = require('../../db/co_log_err.js').cole;

var request = require('superagent');
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);

var validUrl = require('valid-url');

module.exports = function(req, res, next) {
    cole(function* () {

    	var now = new Date().getTime()

		if (req.body.title && (req.body.title.length < 3 || req.body.title.length > 150)) {
			return res.status(200).send({
				success: false,
				message: 'Please enter a title with 3 to 150 charachters.'
			});
		}

		// users do not have to provide an url, but if they do it must be valid
		if (req.body.url && !validUrl.isWebUri(req.body.url)) {
			return res.status(200).send({
				success: false,
				message: 'Please enter a valid url (try to copy it from another browser window).'
			});
		}

		if (req.body.text.length > 1000) {
			return res.status(200).send({
				success: false,
				message: 'Please enter a text with at most 1000 characters. The one you entered had '+req.body.text.lenght+' characters.'
			});
		}

		// the partentkey is the forum name for posts
		if (!req.body.parentKey) {
			return res.status(200).send({
				success: false,
				message: 'Please select a community to post in.'
			});
		}		

		try {
			var embedly = yield agent('GET', 'http://api.embed.ly/1/oembed?key='+process.env.EMBEDLY_KEY+'&url='+req.body.url+'&maxwidth=640');
			
			if(embedly.body && embedly.body.html)
				var html = embedly.body.html
			else 
				var html = ''

			if(embedly.body && embedly.body.thumbnail_url)
				var thumbnail = embedly.body.thumbnail_url
			else 
				var thumbnail = ''

console.log()
console.log()
console.log()
console.log('embedly.body', embedly.body)

console.log()
console.log()
console.log()
console.log('embedly.text', embedly.text)


		} catch (e) {
			var html = ''
			var thumbnail = '' // todo add link to default img here
			console.log('embedly error on post submission', e.response.res.text)
/*
			return res.status(200).send({
				success: false,
				message: 'There was an error with your post submission. We are working on a fix.'
			});
*/
		}

    	// create post
		var post = {
			postKey: req.body.parentKey+"."+random.generate(5), // random 10 char string
			title: req.body.title,
			text: req.body.text,
			url: req.body.url,
			timestamp: now,
			investors: [req.user.username],
			investment: process.env.VOTE_COST,
			username: req.user.username,
			html: html,
			thumbnail: thumbnail,
			commentCount: 0,
			sticky: false,
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
