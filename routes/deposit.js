var express = require('express');
var router = express.Router();
var controller = require('../controllers');

router.post('/'+process.env.DEPOSIT_CALLBACK, controller.payment.deposit);

module.exports = router;