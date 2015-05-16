var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var jade = require('jade');
var fn = jade.compile('../views/index.jade');

// log4js.configure({
//   appenders: [
//     { type: 'console' },
//     { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
//   ]
// });
// var logger = log4js.getLogger('cheese');
var users = require('../libs/users');
// logger.setLevel('ERROR');

/* GET users listing. */
router.get('/', function(req, res) {
  // logger.info(req.route);
  // console.log(req);
  // console.log(req.Proxy-Authorization);
  var result = users.acAlgCall("rsdvg1=1erbs", ["1=1"]);
  console.log(result);
  res.send(result);
});

/* POST users listing. */
router.post('/', function(req, res) {
  console.log(req.body);
  users.getUserData(1)
  .then(function(rows) {
    console.log(rows);
    if (rows.length == 1){
      var htmlOutput = fn({
        user: {
          name: rows[],
          twitter: '@ForbesLindesay',
          blog: 'forbeslindesay.co.uk'
        }
      });
      res.render('index', { title: 'Express' });
    } else {
      res.render('index', { title: 'Express' });
    }
  });
});

/* GET users listing. */
router.get('/getUserData', function(req, res) {
  // logger.info(req.route);
  console.log(req.body.name);
  console.log(users);
  users.getUserData(1)
  .then(function(rows) {
	  console.log(rows);
	  res.send(rows);
  });
});

module.exports = router;
