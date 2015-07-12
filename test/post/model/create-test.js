var Post = require('../../models/post.js');
var should = require('chai').should();
var cole = require('../../db/co_log_err.js').cole;


describe('test post', function() {
  var post = {
    title: 'A Title',
    text: 'text text text text text text text text text text text text text text text text text text ',
    url: 'www.ab.com',
    timestamp: 1234,
    forum: 'main',
    username: 'John',
    postKey: 'testKey', // @TODO: Find out what this property is for
    investment: 100
  };


  it('create', function(done) {
    Post.forge(post).save().then(function(model) {
        console.log('Post saved model', model);
        done();
    });
  });
});
