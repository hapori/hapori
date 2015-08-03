var io = require('socket.io-client');
//var socket = io.connect('http://localhost:3000');
var socket = io.connect('http://hapori.io');
var cookies = require('./cookies.js')



/*
// without jwt
socket.on('connect', function () {
	socket.on('hi', function() {
		console.log('hey')
	})

//	socket.emit('yo', {user:})
});
*/



// with jwt
socket.on('connect', function () {
	console.log('token', cookies.getItem('token'))
	socket.on('authenticated', function () {
		console.log('authenticated')
		socket.on('hi', function(data){
			console.log('hey', data)
		})
	})
    .emit('authenticate', { token: cookies.getItem('token') }); //send the jwt
});


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
