var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var jade = require('jade');

var session = require('../libs/session');
var banks = require('../libs/bank');
var users = require('../libs/users');
router.get('/', function(req, res) {
  var result = users.acAlgCall("rsdvg1=1erbs", ["1=1"]);
  res.send(result);
});

/* POST users listing. */
router.post('/', function(req, res) {
  users.getUserData(req.body.user,req.body.pass)
  .then(function(rows) {
    if (rows.length >= 1){

      var index = -1;
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].IP.trim() == req.connection.remoteAddress.trim()) {
          index = i;
        }
      }
      if (index == -1) {
        session.currentUser = rows[0];
        session.currentUser.IP = req.connection.remoteAddress.trim();
        session.currentUser.rating = 0;
        users.saveUserIP(session.currentUser);
      } else {
        session.currentUser = rows[index];
      }
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
  users.getUserData(1)
  .then(function(rows) {
	  res.send(rows);
  });
});

module.exports = router;
