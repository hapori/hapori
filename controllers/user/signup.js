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
var chain = new Chain(process.env.CHAIN_API_KEY_ID);
chain.apiKeySecret = process.env.CHAIN_API_KEY_SECRET;




module.exports = function(req, res, next) {

  cole(function*() {

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;


    /* perform the ususal checks */
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


    // make sure we get a post request to /deposit when there is a transaction to that address
    chain.createNotification({
        type: "address",
        block_chain: "testnet",
        address: address.toString(),
        url: "https://hapori.io/deposit/"+process.env.DEPOSIT_CALLBACK},
        function(err, resp) {
            if(err) console.log(err)
            else callback(err, resp)
        }
    )



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

