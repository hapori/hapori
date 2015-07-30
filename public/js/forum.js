require('./imports/default.js');

// http://jsfiddle.net/cGDuV/

var $ = require('jquery');




$(function() {

	// prevent iframes form loading on page load
	$('iframe').each(function() {
		var src = $(this).attr('src');
		$(this).data('src', src).attr('src', '');
	});

	// load iframes when thumb is clicked
	$('.thumb-link').click(function(event) {
		event.preventDefault()
		var postId = $(this).attr('id').slice(0,-6)
		postId = postId.replace(/\./g, "\\.")
		$('#'+postId+'-thumb').hide()
		$('#'+postId+'-html').show()
		$('#'+postId+'-html>iframe').attr('src', function() {
			return $(this).data('src');
		});
	})

	// close iframes close is clicked
	// also unload the iframe
	$('.html-close').click(function(event) {
		event.preventDefault()
		var postId = $(this).attr('id').slice(0,-6)
		postId = postId.replace(/\./g, "\\.")
		$('#'+postId+'-thumb').show()
		$('#'+postId+'-html').hide()
		// unload iframe (todo fix this)
		$('#'+postId+'-html>iframe').html('')
	})

})
