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
    return acc + " " + pair.name + " "+ pair.investment+"(" + formattedProfit + ") ";
  }, '');
}




// this function takes an array of comments
// and returns an tree where all comments 
// with same id on level i and below are grouped together 
exports.comments = function(array, i) {

    return _(array)

      // group together all comments that have the same id on level i
      .groupBy(e => e.postKey.split('.')[i])

      // some comments will not have an id on level i because they are ancestors
      // these would get grouped under the key 'undefined'
      // as we don't need them we discard them
      .omit('undefined')

      // we now call f recursively for all nodes on level i+1
      .mapValues(function(group, key){

        // we do not want to call f recursively on leaves of the tree
        // thus we partition into nodes on level i and below 
        var partition = _.partition(group, e => e.postKey.split('.').length == i+1)

        return { 
          post: partition[0][0], 
          tree: exports.comments(partition[1],i+1) }
      })

      // no idea what this does, 
      // but everything goes to s**t if we don't have it
      .value()
}


