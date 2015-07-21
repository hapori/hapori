var express = require('express');
var router = express.Router();
var controller = require('../controllers');


router.get('/:postKey', controller.post.show);


module.exports = router;
