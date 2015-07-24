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







exports.comments = function(array) {

  // this function takes an array of comments
  // and returns an tree where all comments are grouped together 
  // if they have the same id on level i and below
  function f(arr, i) {

    // group together all comments that have the same id on level i
    var grouped = _(arr)
      .groupBy(function(e) {
        return e.commentKey.split('.')[i]
      })
      // some comments will not have an id on level i because they are ancestors
      // these would get grouped under the key 'undefined'
      // as we don't need them we discard them
      .omit('undefined')
      .toJSON();


    // we now call f recursively for all nodes on level i+1
    return _.mapValues(grouped, function(group, key){

      // we do not want to call f recursively on leaves of the tree
      // thus we partition into nodes on level i and below 
      var partition = _.partition(group, function(e) {
                        //return _.last(e.commentKey.split('.')) == key
                        return e.commentKey.split('.').length == i+1
                      })

      return { comment: partition[0], children: f(partition[1],i+1) }
    })

  }

  return f(array, 1)

}