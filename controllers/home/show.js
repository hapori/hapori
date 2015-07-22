var Post = require('../../models/post');
var Forum = require('../../models/forum');
var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;
var format = require('../../helpers/format.js');





module.exports = function show(req, res, next) {


  cole(function*() {

    // fetch all posts and forums
    try {
      var posts = yield Post.forge().fetchAll();
      posts = posts.toJSON();

    } catch (e) {
      return console.log(e, 'could not fetch all Posts');
    }

    try {
      var forums = yield Forum.forge().fetchAll();
      forums = forums.toJSON();
    } catch (e) {
      return console.log(e, 'could not fetch all forums');
    }

    try {
      if (req.user) {
        var user = yield User.where({ id: req.user.id }).fetch();
        user = user.toJSON();
      }
    } catch (e) {
      return console.log(e, 'could not fetch current user');
    }

    res.render('layout', {
      title: 'Express',
      main: 'imports/main/home',
      sidebar: 'imports/sidebar/homeSidebar',
      name: 'home',
      user: user || null,
      posts: posts || null,
      forums: forums || null,
      formatInvestorList: format.investorList,
    });
  });

};



