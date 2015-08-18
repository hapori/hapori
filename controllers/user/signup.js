var User = require('../../models/user');
var Wallet = require('../../models/wallet');
var crypto = require('crypto');
var cole = require('../../db/co_log_err.js').cole;
var jwt = require('jsonwebtoken');
var validator = require("email-validator");

var owasp = require('owasp-password-strength-test');
owasp.config({
  allowPassphrases       : true,
  maxLength              : 128,
  minLength              : 8,
  minPhraseLength        : 20,
  minOptionalTestsToPass : 2,
});

var bitcore = require('bitcore');
bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;


var Chain = require('chain-node');
var chain = new Chain({
  keyId: process.env.CHAIN_API_KEY_ID,
  keySecret: process.env.CHAIN_API_KEY_SECRET,
  blockChain: process.env.NETWORK == 'mainnet' ? 'mainnet' : 'testnet3'
});




module.exports = function(req, res, next) {

  cole(function*() {

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    /* perform the ususal checks */
    if (!username || !email || !password)
      return errorMsg('Please fill in all fields', res)

    var usernameExists = yield User.where({ username: username }).fetch();
    if (usernameExists)
      return errorMsg('Sorry my friend, that username is taken.', res)

    var emailExists = yield User.where({ email: email }).fetch();
    if (emailExists)
      return errorMsg('That email exists in our db. Try logging in perhaps?', res)

    if(!validator.validate(email))
      return errorMsg('Please provide a valid email address.', res)

    if(password.length < 8)
      return errorMsg('Please use a password with at least 8 charachters.', res)      

    if(username.length > 24)
      return errorMsg('Please select a username with at most 24 charachters.', res)

    if(email.length > 64)
      return errorMsg('Please use an email with at most 64 charachters.', res)

    // generate new key address pair for that user
    var key = new bitcore.PrivateKey();
    var address = key.toAddress();

    // todo: register address with chain (see code below)

    // hash & salt password
    var salt = (crypto.randomBytes(12)).toString('hex');
    var passwordHash = crypto.createHash('sha256').update(salt + ':' + password).digest('base64');


/*
    // make sure we get a post request to /deposit when there is a transaction to that address
    chain.createNotification({
        type: "address",
        block_chain: "testnet3",
        address: address.toString(),
        url: "https://hapori.io/deposit/"+process.env.DEPOSIT_CALLBACK},
        function(err, resp) {
            if(err) console.log('chain.createNotification.err',err)
            else console.log('chain.createNotification.resp',resp)
        }
    )
*/

    chain.createNotification({
      type: "address", 
      block_chain: "testnet3", 
      address: address.toString(),
      url: "https://hapori.herokuapp.com/deposit/"+process.env.DEPOSIT_CALLBACK },
      function(err, resp) {
        console.log('chain.createNotification.callback', err, resp);
      }
    );

    // create user
    var user = {
      username: username,
      passwordHash: passwordHash,
      salt: salt,
      email: email,
      balance: process.env.DEFAULT_BALANCE,
      key: key.toString(),
      address: address.toString(),
      joined: new Date().getTime(),
      rank: "newbie",
      status: "user",
    };

    // store user tuple in the db
    var user = yield User.forge(user).save();


    // create a token and store it in a cookie
    var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresInMinutes: 60*48 });
    res.cookie('token', token, { httpOnly: false });
    res.status(201)
    res.json({
      success: true,
    });

  })
};





function errorMsg(message, res) {
  return res.status(200).json({ success: false, message: message }); 
}



