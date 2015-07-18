// https://github.com/scotch-io/node-token-authentication/blob/master/server.js
var User = require('../../models/user');
var jwt = require('jsonwebtoken');

module.exports = function signin(req, res, next) {

  User
    .signin(req.body.username, req.body.password)
    .then(function then(user) {

      // if user is found and password is right
      // create a token and store it in a cookie
      var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresInMinutes: 60*48 });
      res.cookie('token', token, { httpOnly: true });

      res.json({ success: true });

    })
    .catch(next);
};
