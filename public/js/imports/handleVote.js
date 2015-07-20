var $ = require('jquery');
var _ = require('lodash');

module.exports = function() {
	$('.vote-box').click(function(event) {

		event.preventDefault();

		$.ajax({
		    type: 'POST',
		    url: '/vote',
		    data: { postId: $(this).attr('id') }
		}).done(function(data) {
			if(data.success) {
				$('#'+data.postId+'>.vote-number').html(data.investment)
				$('#'+data.postId).next().children().eq(1).html('Investors '+formatInvestors(data.investors))
				$('#balance').text(data.balance)
			} else {
				alert(data.message) // todo
			}
		});
	});
}




// todo: remove code duplication here & in controllers/home/show.js
// todo: replace 100 by constant
var formatInvestors = function(list) {

  // compute profit for each individual node
  var investors = list.map(function(name) { return {name:name, profit: -100, investment: 100}})
  for (var i = 1; i <= list.length; i++)
    for (var j = 0; j < i; j++)
      investors[j].profit += Math.floor(100 / i)

  return _.chain(investors)

    // group together by investor name
    .groupBy(function(element){ return element.name; })

    // sum up the profit & investment for each investor
    .map(function(investor, investorName) {
      return {
          name: investorName,
          profit: _.reduce(investor, function(acc, curr) { return acc+curr.profit }, 0),
          investment: _.reduce(investor, function(acc, curr) { return acc+curr.investment }, 0)
        }
    })

    // format
    .reduce(function(acc, pair) {
      return acc+" "+pair.name+" "+pair.investment+"("+(pair.profit>=0 ? "+"+pair.profit : pair.profit)+"); ";
    }, '');
}
