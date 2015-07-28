var Post = require('../../models/post');
var Forum = require('../../models/forum');
var User = require('../../models/user');

var cole = require('../../db/co_log_err.js').cole;
var format = require('../../helpers/format.js');
var _ = require('lodash');





module.exports = function show(req, res, next) {
  cole(function*() {

    // fetch all posts
    try {
      // if we are on the homepage
      if(!req.params.forumName) {
        var forumName = null
        var posts = yield Post.forge().query(function(qb){
            qb
            .orderByRaw('log(investment/'+process.env.VOTE_COST+') + timestamp/45000000 DESC')
            .limit(25); 
        }).fetchAll();

      // otherwise we are in a forum
      } else {
        var forumName = req.params.forumName
        var posts = yield Post.forge().query(function(qb){
            qb
            .where('forum', forumName)
            .orderByRaw('log(investment/'+process.env.VOTE_COST+') + timestamp/45000000 DESC')
            .limit(25); 
        }).fetchAll();        
      }

      posts = posts.toJSON();
    } catch (e) {
      return console.log(e, 'could not fetch all Posts');
    }

    // fetch all foums
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
      title: 'hapori',
      main: 'imports/main/forum',
      sidebar: 'imports/sidebar/forumSidebar',
      page: 'forum',
      name: 'home', // deprecated
      user: user || null,
      posts: posts || null,
      forums: forums || null,
      forumName: forumName,
      formatInvestorList: format.investorList,
      _: _,
    });
  });

};



