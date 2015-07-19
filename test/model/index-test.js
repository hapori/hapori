
var co = require('co')
var cole = require('../../db/co_log_err.js').cole;

describe('test index', function() {

  it('test co_log_err', function(done) {

    cole(function* () {
        var res = yield db.query('SELECT * FROM posts;', [])
        res[0].text.should.eql(post.text);
	    done();
    })

  });

  it('test co_log_err with explicit client', function(done) {

    cole(function* () {
        var conn = yield db.getConnection()
        var res = yield db.query('SELECT * FROM posts;', [], conn.client)
        res[0].text.should.eql(post.text);
        conn.done()
	    done();
    })
  });
});
