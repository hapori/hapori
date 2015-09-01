var Post = require('../../models/post');
var Vote = require('../../models/vote');
var random = require('../../helpers/random');
var cole = require('../../db/co_log_err.js').cole;
var _ = require('lodash')

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


			if(req.body.url) {

				// fetch embeds from some apis
				var framely = yield agent('GET', 'http://iframe.ly/api/oembed?api_key='+process.env.FRAMELY_API_KEY+'&url='+req.body.url+'&maxwidth=640')
				var embedly = yield agent('GET', 'https://api.embed.ly/1/oembed?key='+process.env.EMBEDLY_KEY+'&url='+req.body.url+'&maxwidth=640')
				var noembed = yield agent('GET', 'https://noembed.com/embed?url='+req.body.url+'&maxwidth=640')

				// parse if results is not null
				var framely = framely ? JSON.parse(framely.text) : null
				var embedly = embedly ? JSON.parse(embedly.text) : null
				var noembed = noembed ? JSON.parse(noembed.text) : null

				if(framely || embedly || noembed) {
					var html = framely.html || embedly.html || noembed.html
					var thumbnail = framely.thumbnail_url || embedly.thumbnail_url || noembed.thumbnail_url
				}

			}


		} catch (e) {
			var html = ''
			var thumbnail = '' // todo add link to default img here
			console.log('embedly error on post submission', e)
		}


		// if the comment has a parent
		if(req.body.parentKey.split('.').length > 1) {
			parentPost = yield Post.where({postKey: req.body.parentKey}).fetch()
			parentPost.set('commentCount', parentPost.get('commentCount')+1)
 			parentPost.save();
		}

	    var user = yield User.where({ secret: req.auth.secret }).fetch()

    	// create post
		var post = {
			postKey: req.body.parentKey+"."+random.generate(5), // random 10 char string
			title: req.body.title,
			text: req.body.text,
			url: req.body.url,
			timestamp: now,
			investors: [user.get('username')],
			investment: process.env.VOTE_COST,
			username: user.get('username'),
			html: html,
			thumbnail: thumbnail,
			commentCount: 0,
			sticky: false,
		};

		var post = yield Post.forge(post).save()
   
   		// create vote
		var vote = {
			userId: user.get('id'),
			postId: post.get('id'),
			timestamp: now
		}
		Vote.forge(vote).save()

		res.json({
			success: true,
		});

	});
};
