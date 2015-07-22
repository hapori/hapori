var $ = require('jquery');
var handleForm = require('./handleForm.js');
var handleVote = require('./handleVote.js');


$(function(){
	handleForm($('#form-signin'))
	handleForm($('#form-signup'))
	handleForm($('#form-submit'))
	handleForm($('#form-create'))

	handleVote()
});