var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var jade = require('jade');

var session = require('../libs/session');
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
    console.log('got ',rows);
    if (rows.length >= 1){

      var index = -1;
      for (var i = 0; i < rows.length; i++) {
        console.log('||',req.connection.remoteAddress, '||');
        if (rows[i].IP.trim() == req.connection.remoteAddress.trim()) {
          index = i;
        }
      }
      console.log(index == -1);
      if (index == -1) {
        session.currentUser = rows[0];
        session.currentUser.IP = req.connection.remoteAddress.trim();
        session.currentUser.rating = 0;
        console.log(session.currentUser);
        users.saveUserIP(session.currentUser);
      } else {
        console.log(session.currentUser,
          rows[index]);
        session.currentUser = rows[index];
      }
      console.log(session.currentUser);
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
