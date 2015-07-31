require('./imports/default.js');

var $ = require('jquery');
var handleForm = require('./imports/handleForm.js');

$(function(){

	/* forms */
	handleForm($('.comment-form, .default-comment-form'))

	$('.reply-button').click(function() {
		$('#'+getPostId(this)).show()
	})

	$('.cancel-button').click(function(e) {
		e.preventDefault()
		$('#'+getPostId(this)).hide()
	})

	$('.add-button').click(function(e) {
		e.preventDefault()
		$('#'+getPostId(this)+'-add').hide()
		$('#'+getPostId(this)+'-url').show()
	})

	function getPostId(t) {
		var postId = $(t).attr('id').split('-')[0]
		return postId.replace(/\./g, "\\.")		
	}


	/* embeds */
	
});