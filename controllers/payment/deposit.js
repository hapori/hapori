var Payment = require('../../models/payment');
var User = require('../../models/user');
//var async = require('async')
var cole = require('../../db/co_log_err.js').cole;


// todo:
// * check nr of confirmations and store payment tuple only once
// * notify user at confirmation = 1
// * verify that transaction exists on the blockchain
module.exports = function(req, res, next) {

  cole(function*() {

    console.log('payment.deposit', req.body)

    res.setHeader('Content-Type', 'text/plain')
    res.status(200)
    res.send("OKi\n");


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