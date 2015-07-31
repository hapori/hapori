// http://jsfiddle.net/cGDuV/

var $ = require('jquery');

module.exports = function() {

		// prevent iframes form loading on page load
		$('.html>iframe').each(function() {
			var src = $(this).attr('src');
			$(this).data('src', src).attr('src', '');
		});

		// load iframes when thumb is clicked
		$('.thumb-link').click(function(event) {
			event.preventDefault()
			var postId = getPostId(this)
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
			var postId = getPostId(this)
			$('#'+postId+'-thumb').show()
			$('#'+postId+'-html').hide()
			// unload iframe (todo fix this)
			$('#'+postId+'-html>iframe').html('')
		})

		function getPostId(t) {
			var postId = $(t).attr('id').split('-')[0]
			return postId.replace(/\./g, "\\.")		
		}

}

