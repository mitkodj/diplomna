var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var jade = require('jade');

var banks = require('../libs/bank');
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
      if (rows[0].IP == null) {
        console.log(rows[0]);
        rows[0].IP = req.connection.remoteAddress;
        rows[0].rating = 0;
        console.log(rows[0]);
        users.saveUserIP(rows[0]);
      }
      users.currentUser = rows[0];
      banks.currentUser = rows[0];
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
