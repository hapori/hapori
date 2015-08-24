var jwt = require('jsonwebtoken');

module.exports = function authenticate(req, res, next) {
 
  // find token in a cookie
  var token = req.cookies.token
  if (!token)
    return next()

  // else if we find a token we try and verify it
  // verifies secret and checks exp
  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {

/*    
    // if token has been messed with we show a failiure message
    if (!user) {
      return res.json({
        success: false,
        message: 'Failed to authenticate token.'
      });
    }
*/

    if(err)
      console.log(err)

    // else if everything is good, save to request for use in other routes
    // perhaps req.session or req.authUser is more explicit?
    if(user)
      req.user = user;
    else
      req.user = null

    next();
  });
}
