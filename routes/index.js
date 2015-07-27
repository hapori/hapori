var express = require('express');
var router = express.Router();
var controller = require('../controllers');
var Post = require('../models/post');

/* home page */
router.get('/', controller.home.show);


router.post('/signup', controller.user.signup);
router.post('/signin', controller.user.signin);
router.get('/logout', controller.user.logout);     // this should be a post (todo)
router.post('/deposit', controller.payment.createDeposit);
router.post('/submitPost', controller.post.create);
router.post('/submitComment', controller.comment.create);
router.post('/create', controller.forum.create);
router.post('/vote', controller.vote.submit);


/*
router.get('/submit', function(req, res, next) {
    res.render('submit', {
        title: 'submit',
        name: 'submit',
        user: req.user
    });
});

router.get('/create', function(req, res, next) {
    res.render('create', {
        title: 'create',
        name: 'create',
        user: req.user
    });
});

router.get('/join', function(req, res, next) {
    res.render('join', {
        title: 'users',
        name: 'join',
        script: 'join',
        user: req.user
    });
});

*/







module.exports = router;





