var express = require('express');
var router = express.Router();
var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
  ]
});
var logger = log4js.getLogger('cheese');
var users = require('../libs/users');
// logger.setLevel('ERROR');

/* GET users listing. */
router.get('/', function(req, res) {
  logger.info(req.route);
  console.log(req.from);
  // console.log(req);
  // console.log(req.Proxy-Authorization);
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/getUserData', function(req, res) {
  // logger.info(req.route);
  console.log(users);
  users.getUserData(1)
  .then(function(rows) {
	  console.log(rows);
	  res.send(rows);
  });
});

module.exports = router;
