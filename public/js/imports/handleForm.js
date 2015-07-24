var $ = require('jquery');

module.exports = function(form, success, failure) {
	$(form).submit(function(event) {
		// Stop the browser from submitting the form.
		event.preventDefault();

		// Submit the form using AJAX.
		// note that we need $(this) below 
		// to fetch the data from the form that emmited the event
		$.ajax({
		    type: 'POST',
		    url: $(this).attr('action'),
		    data: $(this).serializeArray()
		}).done(function(data) {


			location.reload();
/*
			if(data.success)
				if(success) success(data)
				else window.location.href = '/'
			else
				if(failure) failure(data)
				else alert(data.message)
*/
		});
		return false;
	});
}