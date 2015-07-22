var _ = require('lodash');


exports.investorList = function(list) {
	
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