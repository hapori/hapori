var express = require('express');
var router = express.Router();
var controller = require('../controllers');


router.get('/:forumName', controller.forum.show);


module.exports = router;
