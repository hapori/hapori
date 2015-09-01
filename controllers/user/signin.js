// https://github.com/scotch-io/node-token-authentication/blob/master/server.js
var User = require('../../models/user');
var crypto = require('crypto');
var cole = require('../../db/co_log_err.js').cole;
var jwt = require('jsonwebtoken');
var validator = require("email-validator");


module.exports = function signin(req, res, next) {

/*
  User
    .signin(req.body.username, req.body.password)
    .then(function then(user) {

      // if user is found and password is right
      // create a token and store it in a cookie
      var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresInMinutes: 60*48 });

      res.cookie('token', token, { httpOnly: false });
      res.json({ success: true });

    })
    .catch(next);
*/

  cole(function*() {

    var password = req.body.password;
    var email = req.body.email;

    if (!email || !password) return failiure(res, 'Please fill in all fields.');

    if(!validator.validate(email)) return failiure(res, 'Please sign in with your Email address.');

    // find the user by email to recover the salt
    var emailUser = yield User.where({ email: email }).fetch();
    if(!emailUser) return failiure(res, 'Authentication failed. User/password combination not found.');

    // compute passwordHash and look for user
    var passwordHash = crypto.createHash('sha256').update(emailUser.get('salt') + ':' + password).digest('base64');
    var user = yield User.where({ email: email, passwordHash: passwordHash }).fetch();
    if (!user) return failiure(res, 'Authentication failed. User/password combination not found.');

    // create a token and store it in a cookie
    var token = jwt.sign({ secret: user.secret }, process.env.JWT_SECRET, { expiresInMinutes: 60*24*7 });
    res.cookie('token', token, { httpOnly: true });
    res.status(201)
    res.json({
      success: true,
    });

  })


};

function failiure(res, message) {
  return res.status(200).json({
    success: false,
    message: message
  });
}
