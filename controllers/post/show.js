var Post = require('../../models/post');
var Forum = require('../../models/forum');
var Comments = require('../../models/comment');
var User = require('../../models/user');

var cole = require('../../db/co_log_err.js').cole;
var format = require('../../helpers/format');
var _ = require('lodash');




module.exports = function show(req, res, next) {
  cole(function*() {

    // we translate req.params[0] of the form /a/b/c
    // into a postKey of the form be a.b.c
    var postKey = req.params[0].replace(/\//g, '.').substr(1)

    // select all descendants of req.params.postKey
    try {
      var posts = yield Post.forge().query(function(qb){
          qb.whereRaw('"postKey" ~ \''+postKey+'.*\'')               // postKeys of length 2
      }).fetchAll();
      posts = posts.toJSON()
    } catch (e) {
      return console.log(e, 'could not fetch all posts');
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
      main: 'imports/main/post',
      sidebar: 'imports/sidebar/forumSidebar',
      name: 'post', // deprecated
      page: 'post',
      user: user || null,
      posts: posts || null,
      postKey: postKey || null,
      forums: forums || null,
      formatInvestorList: format.investorList,
      formatComments: format.comments,
      _: _,
    });
  });

};





