var Post = require('../../models/post');
var Comments = require('../../models/comment');
var User = require('../../models/user');

var cole = require('../../db/co_log_err.js').cole;
var format = require('hapori-format');



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
      var comments = yield Comments.where({ postKey: req.params.postKey }).fetch();
      if(comments)
        comments = comments.toJSON();
    } catch (e) {
      return console.log(e, 'could not fetch Comments');
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
      sidebar: 'imports/sidebar/homeSidebar',
      name: 'post',
      post: post || null,
      comments: comments || null,
      formatInvestorList: format.investorList,
      user: user || null,
    });
  });

};



