var Payment = require('../../models/payment');
var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;
var io_ = require('./io.js')
var config = require('../../config')
var bitcoinAddress = require('bitcoin-address')



// todo:
// * check nr of confirmations and store payment tuple only once
// * notify user at confirmation = 1
// * verify that transaction exists on the blockchain
module.exports = function(req, res, next) {


	var amount = parseFloat(req.body.amount).toSatoshi(),
		address = req.body.address,
		username = req.body.username

console.log(amount, address, username)

	cole(function*() {

	    var user = yield User.where({ username: username }).fetch();

console.log(user)


		var sumDeposits = yield Post.forge().query(function(knex){
//			knex.whereRaw('SELECT sum(amount) FROM payments WHERE username=? AND kind=?', [username, 'deposit'])               // postKeys of length 2
			knex('payments').sum('amount').where({'username': username, 'kind': 'deposit'})               // postKeys of length 2
		}).fetchAll();
		sumDeposits = sumDeposits.toJSON()

		console.log(sumDeposits)


		var sumWithdraws = yield Post.forge().query(function(qb){
			qb.whereRaw('SELECT sum(amount) FROM payments WHERE username=? AND kind=?', [username, 'withdraw'])               // postKeys of length 2
		}).fetchAll();
		sumWithdraws = sumWithdraws.toJSON() + amount

	    if(isNaN(amount) || !isFinite(amount)) {
	    	return errorMsg('Please insert a valid amount')
	    } else if(amount < config.payment.minWithdraw) {
	    	return errorMsg('Sorry mate, you have to withdraw at least '+config.payment.minWithdraw)
	    } else if(amount > user.balance) {
	    	return errorMsg('You cannot withdraw more than your balance (we\'re not in the lending business).')
	    } else if(!bitcoinAddress.validate(address)) {
	    	return errorMsg('Please insert a valid bitcoin address')
	    } else if(withdrawTooHigh(sumDeposits, sumWithdraws, amount)) {
	    	return errorMsg('Please insert a valid amount')
	    } else {

/*
	      // send bitcoin
	      fsBtc.send(amount, address, function(error, response) {
	          paymentCallback(error, response, socket, amount, session, conn)            
	      })
*/
	    } 



	});

}

function errorMsg(message) {
	return res.status(200).json({
		success: false,
		message: message
	}); 
}
 
function withdrawTooHigh(sumDeposits, sumWithdraws, amount) {
  // we do not pay out if either
  //  * the withdraw is either bigger than 0.5 btc
  //  * or the user has never made a desposit (in this case sumDeposits will be null)
  //  * or the user has won more than 2.5x the amount he deposited
  return amount > 50000000 || sumDeposits == 0 || sumWithdraws/sumDeposits > 1.2
}
