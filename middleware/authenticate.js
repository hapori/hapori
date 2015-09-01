var jwt = require('jsonwebtoken');

module.exports = function authenticate(req, res, next) {
 
  // find token in a cookie
  var token = req.cookies.token
  if (!token)
    return next()

  // else if we find a token we try and verify it
  // verifies secret and checks exp
  jwt.verify(token, process.env.JWT_SECRET, function(err, auth) {

    if(err) {
      // if token has been messed with we show a failiure message
      console.log(err)
      return res.json({
        success: false,
        message: 'Failed to authenticate token.'
      });
    } else {
      req.auth = auth
    }

    next();

  });
}
