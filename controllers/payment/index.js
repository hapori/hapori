//module.exports = require('require-directory')(module);

var Payment = require('../../models/payment');
var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;

var io = null



exports.setIo = function (_io) {
   console.log('setting io')
  io = _io
}




exports.deposit = function(req, res, next) {
  cole(function*() {

    console.log('asljdn')

    res.setHeader('Content-Type', 'text/plain')
    res.status(200)
    res.send("OK\n");


/*
    try {
      var user = (yield User.findByAddress(req.body.payload.address))[0]
    } catch (err) {
      return next(err); // TODO send proper error response
    }
    //console.log(user, req.body.payload)
    try {
      yield Payment.createDeposit(req.body.payload, user.username)
    } catch (err) {
      return next(err); // TODO send proper error response
    }


    res.setHeader('Content-Type', 'text/plain')
    res.status(200)
    res.send("OK\n");
*/
  });
}
