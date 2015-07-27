var User = require('../../models/user');
var Wallet = require('../../models/wallet');
var Chain = require('chain-node');
var chain = new Chain('c217818c8c0b31e012775aa8b5ebb318'); // todo: move to dot env
var bitcore = require('bitcore');
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


module.exports = function(req, res, next) {

  cole(function*() {

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    if (!username || !email || !password) {
      return res.status(401).send({
        success: false,
        message: 'Please fill in all fields'
      });
    }

    var usernameExists = yield User.where({ username: username }).fetch();
    if (usernameExists){
      return res.status(200).json({
        success: false,
        message: 'Sorry my friend, that username is taken.'
      });
    }
    // A lot of people like how reddit doesn't require a email
    // are we requiring email to recover bitcoin wallets? ~ Roland
    var emailExists = yield User.where({ email: email }).fetch();
    if (emailExists) {
      return res.status(200).json({
        success: false,
        message: 'That email exists in our db. Try logging in perhaps?'
      });
    }

    if(!validator.validate(email)) {
      return res.status(200).json({
        success: false,
        message: 'Please provide a valid email address.'
      });      
    }

/*
    var passwordStrength = owasp.test(password)
    if(passwordStrength.errors) {
      return res.status(200).json({
        success: false,
        message: passwordStrength.errors.join(' ')
      });      
    }
*/

    if(password.length < 8) {
      return res.status(200).json({
        success: false,
        message: 'Please use a password with at least 8 charachters.'
      });      
    }

    // generate new key address pair for that user
    var key = new bitcore.PrivateKey();
    var address = key.toAddress();

    // todo: register address with chain (see code below)

    // hash & salt password
    var salt = (crypto.randomBytes(12)).toString('hex');
    var passwordHash = crypto.createHash('sha256').update(salt + ':' + password).digest('base64');

    // create user
    var user = {
      username: username,
      passwordHash: passwordHash,
      salt: salt,
      email: email,
      balance: process.env.DEFAULT_BALANCE,
      key: key.toString(),
      address: address.toString(),
      joined: new Date().getTime()
    };

    // store user tuple in the db
    var user = yield User.forge(user).save();

    // What's this user.id being used for? ~ Roland
    // @Roland: I changed stuff around here: we now sore the userId in the token so that we can identify the user on subsequent requests
    //user.id = idObj.id

    // create a token and store it in a cookie
    var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresInMinutes: 60*48 });
    res.cookie('token', token, { httpOnly: true });
    res.status(201)
    res.json({
      success: true,
    });

  })
};

/*
    // make sure we get a post request to /deposit when there is a transaction to that address
    chain.createNotification({
        type: "address",
        block_chain: "bitcoin",
        address: address.toString(),
        url: "https://bitcoinreddit.com/deposit"},
        function(err, resp) {
            if(err) fsLogger.logError(err)
            else callback(err, resp)
        }
    )
*/
