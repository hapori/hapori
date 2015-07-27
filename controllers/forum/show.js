var Post = require('../../models/post');
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
      formatComments: format.comments,
//      noembed: JSON.parse(noembed.res.text).html,
//      embedly: embedly.body.html,
      _: _,
      user: user || null,
    });
  });

};


function parse(unsafe) {
    return unsafe.toJSON()

}



