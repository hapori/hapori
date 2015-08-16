var $ = require('jquery');

module.exports = function(form, success, failure) {
	$(form).submit(function(event) {
		// Stop the browser from submitting the form.
		event.preventDefault();
		$(form).find(':submit').prop("disabled",true)

		console.log('submitting to ', $(this).attr('action'), $(this).serializeArray())


		// Submit the form using AJAX.
		// note that we need $(this) below 
		// to fetch the data from the form that emmited the event
		$.ajax({
		    type: 'POST',
		    url: $(this).attr('action'),
		    data: $(this).serializeArray()
		}).done(function(data) {

		console.log('done')


			if(data.success)
				location.reload();
			else
				if(failure) failure(data)
				else alert(data.message)

		});
		return false;
	});
}