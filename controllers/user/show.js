User = require('../../models/user');

module.exports = function show(req, res, next) {

  var username = req.params.username;

  User.forge({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      user = user.attributes;
      res.json(user);

    }).catch(function(err) {
      next(err);
    });
};
