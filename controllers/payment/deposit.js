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

    // check that request is well formed
    if( typeof req.body === 'undefined' || 
        typeof req.body.payload === 'undefined' || 
        typeof req.body.payload.address === 'undefined' || 
        typeof req.body.payload.received === 'undefined' ||
        typeof req.body.payload.transaction_hash === 'undefined' ||
        typeof req.body.payload.confirmations === 'undefined' ||
        typeof req.body.payload.input_addresses === 'undefined' ||

        typeof req.params === 'undefined' ||
        typeof req.params.depositCallback === 'undefined' ||

        req.params.depositCallback != process.env.DEPOSIT_CALLBACK ) {

      console.log('malformed POST request', req.body, req.params.depositCallback)
      return false
    }

    var address = req.body.payload.address
    var received = req.body.payload.received
    var sent = req.body.payload.sent
    var transactionHash = req.body.payload.transaction_hash
    var confirmations = req.body.payload.confirmations
    var inputAddress = req.body.payload.input_addresses[0]

    var payment = yield Payment.where({ transactionHash: transactionHash }).fetch();
    var user = yield User.where({ address: address }).fetch();

    var io = io_.get()

    io.emit('deposit', req.body.payload)

    // if the transaction is already in the db
    // we do nothing because we have already updated the bal
    if(payment) {

      console.log('tx already in db ' + JSON.stringify(req.body.payload.transaction_hash))

    // if no user with that address has been found, abort
    } else if(!user) {

      console.log('unknown user with address', address)

    // if the transaction on the address is a sending one, we log the homecoming
    } else if(received == 0) {

      console.log('received == 0')

      if(confirmations == 0)
        console.log('homecomming', address, sent, txid, new Date().getTime())

    // in this case it must be a genuine deposit, we notify the user
    } else if(confirmations == 0) {

      console.log('confirmations == 0')

      if(io) 
        io.emit('deposit', { 
          received: received, 
          address: address,
          confirmations: confirmations 
        })

    // if the tx has reached 1 confirmation, we update user balance, bankroll, store a payment, notify the user and log
    } else if(confirmations >= 1 && !payment) {

      console.log('confirmations >= 1 && !payment', confirmations)

      user.set('balance', user.get('balance') + received)
      yield user.save()

      var payment = {
        amount: received,
        transactionHash: transactionHash,
        username: user.get('username'),
        kind: 'deposit',
        timestamp: new Date().getTime()
      }
      payment = yield Payment.forge(payment).save()

      if(io) io.emit('deposit', { 
              received: received, 
              address: address,
              confirmations: confirmations, 
            })
    }

    res.setHeader('Content-Type', 'text/plain')
    res.status(200)
    res.send("OK\n");

  });

}
 
