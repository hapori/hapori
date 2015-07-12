var co = require('co');

exports.cole = function(callback) {
    co(function* () {
      try{

      	return yield callback();

      } catch(err) {
        console.error('CO error:', err);
      }
    }).catch(function(err){
      console.error('CO catch error:', err);
    })

};
