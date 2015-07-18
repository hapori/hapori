var Post = require('../../models/post');
var Forum = require('../../models/forum');
var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;
var _ = require('lodash');

var formatInvestors = function(list) {
  // compute profit for each individual node
  var investors = list.map(function(name) { return {name:name, profit: -process.env.VOTE_COST}})
  for (var i = 1; i <= list.length; i++)
    for (var j = 0; j < i; j++)
      investors[j].profit += Math.floor(process.env.VOTE_COST / i)

  return _.chain(investors)

    // group together by investor name
    .groupBy(function(element){ return element.name; })

    // sum up the profit for each investor
    .map(function(investor, investorName) {
      return {
          name: investorName,
          profit: _.reduce(investor, function(acc, curr) { return acc+curr.profit }, 0)}
    })

    // format
    .reduce(function(acc, pair) {
      return acc+" "+pair.name+"("+pair.profit+") ";
    }, '');
}



module.exports = function show(req, res, next) {
  cole(function*() {

    // fetch all posts and forums
    var posts = (yield Post.forge().fetchAll()).toJSON();
    var forums = (yield Forum.forge().fetchAll()).toJSON();
    if(req.user)
      var user = (yield User.where({id: req.user.id}).fetch()).toJSON()

    res.render('layout', {
      title: 'Express',
      main: 'imports/feeds/homeFeed',
      sidebar: 'imports/sidebars/homeSidebar',
      name: 'home',
      user: user || null,
      posts: posts || null,
      forums: forums || null,
      formatInvestors: formatInvestors
    });
  });

};
