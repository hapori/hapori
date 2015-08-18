var $ = require('jquery');

module.exports = function(form, success, failure) {
	$(form).submit(function(event) {
		// Stop the browser from submitting the form.
		event.preventDefault();
		$(form).find(':submit').prop("disabled", true)

		// Submit the form using AJAX.
		// note that we need $(this) below 
		// to fetch the data from the form that emmited the event
		$.ajax({
		    type: 'POST',
		    url: $(this).attr('action'),
		    data: $(this).serializeArray()
		}).done(function(data) {

			if(data.success) {
				if(data.message)
					alert(data.message)
				location.reload();
			} else {
				$(form).find(':submit').prop("disabled", false)
				if(failure) failure(data)
				else alert(data.message)				
			}

		});
		return false;
	});
}