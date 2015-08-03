var express = require('express');
var router = express.Router();
var controller = require('../controllers');

/* GET users listing. */
/*
router.post('/'+process.env.DEPOSIT_CALLBACK, function(req, res, next) {
//router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

router.post('/'+process.env.DEPOSIT_CALLBACK, controller.payment.deposit);





module.exports = router;
