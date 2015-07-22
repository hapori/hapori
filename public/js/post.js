require('./imports/default.js');

var $ = require('jquery');
var handleForm = require('./imports/handleForm.js');

$(function(){
	handleForm($('.comment-form'))
});