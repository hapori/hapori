var Post = require('../../models/post');
var Forum = require('../../models/forum');
var User = require('../../models/user');

var cole = require('../../db/co_log_err.js').cole;
var _ = require('lodash');

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


    if (req.user) {
      var user = yield User.where({ id: req.user.id }).fetch();
      user = user.toJSON();
    }

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


var formatInvestors = function(list) {
  // compute profit for each individual node

  const VOTE_COST = parseInt(process.env.VOTE_COST)
  var investors = list.map(function(name) {
    return {
      name: name,
      profit: -VOTE_COST,
      investment: VOTE_COST,
    }
  })

  for (var i = 1; i <= list.length; i++)
    for (var j = 0; j < i; j++)
      investors[j].profit += Math.floor(VOTE_COST / i)

  return _.chain(investors)

  // group together by investor name
  .groupBy(function(element) {
    return element.name;
  })

  // sum up the profit for each investor
  .map(function(investor, investorName) {
    return {
      name: investorName,
      profit: _.reduce(investor, function(acc, curr) {
        return acc + curr.profit
      }, 0),
      investment: _.reduce(investor, function(acc, curr) {
        return acc + curr.investment
      }, 0),
    }
  })

  // format
  .reduce(function(acc, pair) {
    var formattedProfit = pair.profit>0 ? "+"+pair.profit : pair.profit
    return acc + " " + pair.name + " "+ pair.investment+"(" + formattedProfit + "); ";
  }, '');
}
