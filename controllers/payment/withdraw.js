var Payment = require('../../models/payment');
var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;
var io_ = require('./io.js')
var config = require('../../config')
var bitcoinAddress = require('bitcoin-address')
var bitcoinMath = require('bitcoin-math')

var Chain = require('chain-node');
var chain = new Chain({
  keyId: process.env.CHAIN_API_KEY_ID,
  keySecret: process.env.CHAIN_API_KEY_SECRET,
  blockChain: process.env.NETWORK == 'mainnet' ? 'mainnet' : 'testnet3'
});






module.exports = function(req, res, next) {

	cole(function*() {

		if(isNaN(req.body.amount) || !isFinite(req.body.amount))
			return errorMsg('Please insert a valid amount', res)

		var amount = parseFloat(req.body.amount).toSatoshi()
		var address = req.body.address
		var username = req.user.username
	    var user = yield User.where({ username: username }).fetch()

		// compute sum of all deposits and withdraws, needed for wallet protection		
		var sumDepositTuples = yield Payment.forge().query().sum('amount').where({'username': username, 'kind': 'deposit'})
		sumDeposits = sumDepositTuples[0].sum || 0
		var sumWithdrawTuples = yield Payment.forge().query().sum('amount').where({'username': username, 'kind': 'withdraw'})
		sumWithdraws = sumWithdrawTuples[0].sum + amount || amount

		// check that withdraw is neither to big nor too small, and that the address is valid
	    if(amount < config.payment.minWithdraw) {
	    	return errorMsg('Sorry mate, you have to withdraw at least '+config.payment.minWithdraw, res)
	    } else if(amount > user.get('balance')) {
	    	return errorMsg('You cannot withdraw more than your balance (would not be an awesome business model for us of you could).', res)
	    } else if(!bitcoinAddress.validate(address,  process.env.NETWORK == 'mainnet' ? 'prod' : 'testnet')) {
	    	return errorMsg('Please insert a valid bitcoin address', res)
	    } else if(withdrawTooHigh(sumDeposits, sumWithdraws, amount)) {
	    	return errorMsg('To guaranty a high standard of security we will have to review your withdraw manually. Please contact support and we will get you sorted asap.', res)
	    } else {

			var callback = function(err, resp) {
				cole(function*() {

					if(err) {

						// log error and inform user in case of error
						console.log('withdraw error', err.resp.toJSON().body)
				    	return errorMsg('Sorry mate, something went wrong. Please contact support and we will send you your bitcoins as quick as possible', res)

					} else {

						// store payment info in db and update user balance
						var payment = {
							amount: amount,
							transactionHash: resp.transaction_hash,
							username: username,
							kind: 'withdraw',
							timestamp: new Date().getTime()
						}
						yield Payment.forge(payment).save()

						user.set('balance', user.get('balance')-amount)
						yield user.save()

						return res.status(201).json({ success: true, message: 'Your withdraw has been processed and should be visible in your wallet right now, see https://blockexplorer.com/tx/'+resp.transaction_hash})

					}
				});
			}

			var mainAddress = process.env.NETWORK == 'mainnet' ? process.env.MAINNET_ADDRESS : process.env.TESTNET_ADDRESS
			var privateKey = process.env.NETWORK == 'mainnet' ? process.env.MAINNET_KEY : process.env.TESTNET_KEY

			// send out transaction
			chain.transact({
				inputs: [{ address: mainAddress, private_key: privateKey }],
				outputs: [{ address: address, amount: amount }]
				}, callback
			)

	    } 

	});

}




function errorMsg(message, res) {
	return res.status(200).json({ success: false, message: message }); 
}

 
function withdrawTooHigh(sumDeposits, sumWithdraws, amount) {
	
	// we always pay out amounts < 100000
	// we do not pay out if either
	//  * the withdraw is either bigger than 0.5 btc
	//  * or the user has never made a desposit (in this case sumDeposits will be null)
	//  * or the user has won more than 2.5x the amount he deposited

	if(amount < 100000) return false
	else return amount > 50000000 || sumDeposits == 0 || sumWithdraws/sumDeposits > 1.2
}







