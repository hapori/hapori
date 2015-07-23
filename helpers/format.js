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
  // and returns an object where all comments are grouped together 
  // if they have the same id on level i
  function f(arr, i) {

    //console.log('i',i,'arr',arr)

    var grouped = _.chain(arr)
      // groupt together all comments that have the same id on level i
      .groupBy(function(e) {
        return e.commentKey.split('.')[i]
      })
      // some comments will not have an id on level i because they are ancestors
      // these would get grouped under the key 'undefined'
      // as we don't need them we discard them
      .omit('undefined')
      .toJSON();




    return _.mapValues(grouped, function(group, key){


    console.log('i',i,'key',key,'group',group)
    console.log()
    console.log()

      // partition the group into elements where the current key 
      // is equal to the end of their commentKey
      // these elements (partition[0]) are the comment on this level
      // partition[1] contains all descendant of the current comment
      var partition = _.partition(group, function(e) {
                        return _.last(e.commentKey.split('.')) == key
                      })

      return { comment: partition[0], children: f(partition[1],i+1) }
    })

  }

  return f(array, 0)

}