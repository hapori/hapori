var Post = require('../../models/post');
var Forum = require('../../models/forum');
var Comments = require('../../models/comment');
var User = require('../../models/user');

var cole = require('../../db/co_log_err.js').cole;
var format = require('../../helpers/format');
var _ = require('lodash');




module.exports = function show(req, res, next) {
  cole(function*() {

    try {
      // we translate req.params[0] of the form /a/b/c into a postKey of the form be a.b.c
      var postKey = req.params[0].replace(/\//g, '.').substr(1)
      // select all descendants of req.params.postKey
      var posts = yield Post.forge().query(qb => qb.whereRaw('"postKey" ~ \''+postKey+'.*\'')).fetchAll();    // postKeys of length 2
    } catch (e) {
      return console.log(e, 'could not fetch all posts');
    }

    try {
      var forums = yield Forum.forge().fetchAll();
    } catch (e) {
      return console.log(e, 'could not fetch all forums');
    }

    try {
        var user =  (req.auth && req.auth.secret) ?
                    (yield User.where({ secret: req.auth.secret }).fetch()).toJSON() :
                    null
    } catch (e) {
      return console.log(e, 'could not fetch current user');
    }

   //console.log(posts.toJSON(), forums.toJSON(), user.toJSON())


    res.render('layout', {
      title: 'hapori',
      main: 'imports/main/post',
      sidebar: 'imports/sidebar/forumSidebar',
      name: 'post', // deprecated
      page: 'post',
      user: user.toJSON() || null,
      posts: posts.toJSON() || null,
      forums: forums.toJSON() || null,
      postKey: postKey || null,
      forumName: 'yolo',
      description: 'swag',
      formatInvestorList: format.investorList,
      formatComments: format.comments,
      _: _,
    });
  });

};





