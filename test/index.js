require('./forum');
require('./payment');
require('./user');
require('./vote');
require('./post');


var test = require('tape');

test('done', function(t){
  t.end();
  process.exit();
});
