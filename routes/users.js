var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var jade = require('jade');


var users = require('../libs/users');
router.get('/', function(req, res) {
  var result = users.acAlgCall("rsdvg1=1erbs", ["1=1"]);
  console.log(result);
  res.send(result);
});

/* POST users listing. */
router.post('/', function(req, res) {
  console.log(req.body);
  users.getUserData(req.body.user,req.body.pass)
  .then(function(rows) {
    console.log(rows);
    if (rows.length == 1){
      var htmlOutput = {
        user: {
          name: rows[0].username
        }
      };
      res.render('index', htmlOutput);
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
