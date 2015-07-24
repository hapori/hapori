require('./imports/default.js');

var $ = require('jquery');
var handleForm = require('./imports/handleForm.js');

$(function(){
	handleForm($('.comment-form'))

	$('.reply-button').click(function() {
		var postId = $(this).attr('id').split('-')[0]
		postId = postId.replace(/\./g, "\\.")
		$('#'+postId).show()
	})

	$('.cancel-button').click(function() {
		var postId = $(this).attr('id').split('-')[0]
		postId = postId.replace(/\./g, "\\.")
		$('#'+postId).hide()
	})	
});