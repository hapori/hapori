var io = require('socket.io-client');
//var socket = io.connect('http://localhost:3000');
var socket = io.connect('http://www.hapori.io/');
var cookies = require('./cookies.js')
var $ = require('jquery');


// without jwt
module.exports = function() {
	socket.on('connect', function () {
		socket.on('deposit', despositNotification)
	});
}


function despositNotification(data) {
	var address = $('#deposit-address').html()
	if(data.address == address && data.confirmations == 0) {
		var text = 'We just received your deposit of '+data.received+' satoshi. '
				 + 'Your deposoit will be credited when it has one confirmations.'
		alert(text)
	} else {
		var text = 'Your deposit of '+data.received+' has just been credited (please reload the page to activate).'
				 + 'Invest it wisely :-).'
		alert(text)		
	}
}



/*
// with jwt
socket.on('connect', function () {
	console.log('token', cookies.getItem('token'))
	socket.on('authenticated', function () {
		
		socket.on('hi', function(data){
			console.log('hey', data)
		})
	})
    .emit('authenticate', { token: cookies.getItem('token') }); //send the jwt
});
*/




/*
// direct connection with chain api
var conn = new WebSocket("wss://ws.chain.com/v2/notifications");
conn.onopen = function (ev) {
  var req = {type: "new-transaction", block_chain: "testnet3"};
  conn.send(JSON.stringify(req));
};

conn.onmessage = function (ev) {
  var x = JSON.parse(ev.data);
  console.log(x);
};
*/
