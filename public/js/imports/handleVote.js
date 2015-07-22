var $ = require('jquery');
var _ = require('lodash');

module.exports = function() {
	$('.vote-box').click(function(event) {
		event.preventDefault();
		$.ajax({
		    type: 'POST',
		    url: '/vote',
		    data: { postId: $(this).attr('id') }
		}).done(function(data) {
			if(data.success) {
				$('#'+data.postId+'>.vote-number').html(data.investment)
				$('#'+data.postId+'-investors').text('Investors '+data.investors)
				$('#balance').text(data.balance)
			} else {
				alert(data.message) // todo
			}
		});
	});
}





