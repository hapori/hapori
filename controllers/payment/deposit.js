var Payment = require('../../models/payment');
var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;
var io_ = require('./io.js')



// todo:
// * check nr of confirmations and store payment tuple only once
// * notify user at confirmation = 1
// * verify that transaction exists on the blockchain
module.exports = function(req, res, next) {

  cole(function*() {


    console.log('req.body', req.body)

    // check that request is well formed
    if( !req.body.payload || 
        !req.body.payload.address ||
        !req.body.payload.received ||
        !req.body.payload.sent ||
        !req.body.payload.transaction_hash ||
        !req.body.payload.confirmations ||
        !req.body.payload.input_addresses ||
        !req.params.depositCallback ||
        typeof req.body.payload === 'undefined' || 
        typeof req.body.payload.address === 'undefined' || 
        typeof req.body.payload.received === 'undefined' ||
        typeof req.body.payload.transaction_hash === 'undefined' ||
        req.params.depositCallback != process.env.DEPOSIT_CALLBACK) {

      console.log('malformed POST request', req.body)
      return false
    
    }

console.log(1)

    var address = req.body.payload.address
    var received = req.body.payload.received
    var sent = req.body.payload.sent
    var transactionHash = req.body.payload.transaction_hash
    var confirmations = req.body.payload.confirmations
    var inputAddress = req.body.payload.input_addresses[0]

console.log(2)


    //    payment = (yield fbdb.getObj('payments', 'txid', txid, false, conn))[0]
    //    session = (yield fbdb.getObj('fs_sessions', 'userAddress', address, false, conn))[0]

    var payment = yield Payment.where({ transactionHash: transactionHash }).fetch();
    var user = yield User.where({ address: address }).fetch();



console.log('payment', payment)
console.log('user', user)


    var io = io_.get()


    if(io) {
      io.emit('hi', { data: req.body })
    }

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
 
