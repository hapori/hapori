// https://github.com/scotch-io/node-token-authentication/blob/master/server.js

var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var errors = require('../../lib/errors');

module.exports = function signin(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  User.signin(username, password).then(function then(user) {

      // if user is found and password is right
      // create a token and store it in a cookie
      var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresInMinutes: 60*48 });
      res.cookie('token', token, { httpOnly: true });

      res.json({ success: true });

    }).catch(function (err){

      next(err);

      // res.json(err)
    });
};
