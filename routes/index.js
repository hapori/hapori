var express = require('express');
var router = express.Router();
var controller = require('../controllers');




/* auth */
router.post('/signup', controller.user.signup);
router.post('/signin', controller.user.signin);
router.get('/logout', controller.user.logout);     // this should be a post (todo)

/* payments */
router.post('/deposit/'+process.env.DEPOSIT_CALLBACK, controller.payment.deposit);

/* submit stuff */
router.post('/submitPost', controller.post.create);
//router.post('/submitComment', controller.comment.create);
router.post('/create', controller.forum.create);
router.post('/vote', controller.vote.submit);

/* home page */
router.get('/', controller.forum.show);
router.get('/:forumName', controller.forum.show)


router.get('*?', controller.post.show);

module.exports = router;
