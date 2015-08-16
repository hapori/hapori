var $ = require('jquery');
var handleForm = require('./handleForm.js');
var handleVote = require('./handleVote.js');
var handleThumbs = require('./handleThumbs.js');
var handleSocket = require('./handleSocket.js');


$(function(){
	handleForm($('#form-signin'))
	handleForm($('#form-signup'))
	handleForm($('#form-submit'))
	handleForm($('#form-create'))
	handleForm($('#form-withdraw'))


	handleVote()
	handleThumbs()
	handleSocket()
});