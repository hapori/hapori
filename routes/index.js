var express = require('express');
var router = express.Router();
var controller = require('../controllers');




/* auth */
router.post('/signup', controller.user.signup);
router.post('/signin', controller.user.signin);
router.get('/logout', controller.user.logout);     // this should be a post (todo)

/* payments */
router.post('/deposit/:depositCallback', controller.payment.deposit);
router.post('/withdraw', controller.payment.withdraw);

/* submit posts & votes */
router.post('/submitPost', controller.post.create);
router.post('/create', controller.forum.create);
router.post('/vote', controller.vote.submit);

/* home page */
router.get('/', controller.forum.show);

/* forums */
router.get('/:forumName', controller.forum.show)

/* posts */
router.get('*?', controller.post.show);

module.exports = router;
