var Post = require('../../models/post');
var Forum = require('../../models/forum');
var Comments = require('../../models/comment');
var User = require('../../models/user');

var cole = require('../../db/co_log_err.js').cole;
var format = require('../../helpers/format');
var _ = require('lodash');




module.exports = function show(req, res, next) {
  cole(function*() {

    // fetch all posts and forums
    try {
      var post = yield Post.where({ postKey: req.params.postKey }).fetch();
      post = post.toJSON();
    } catch (e) {
      return console.log(e, 'could not fetch Post');
    }

    // fetch all comments
    try {
      //var comments = yield Comments.where({ postKey: req.params.postKey }).fetchAll();
      var comments = yield Comments.query(function(qb) {
                      qb.where({ postKey: req.params.postKey }).orderBy('commentKey', 'asc');
                    }).fetchAll();
      if(comments) comments = comments.toJSON();
    } catch (e) {
      return console.log(e, 'could not fetch Comments');
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
      post: post || null,
      forums: forums || null,
      forumName: null,
      comments: comments || null,
      formatInvestorList: format.investorList,
      formatComments: format.comments,
      _: _,
    });
  });

};





