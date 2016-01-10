var express = require('express');
var router = express.Router();
var users = require('../libs/users');
var session = require('../libs/session');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
  // res.sendfile('./public/js/index.html');
  // res.render('index', { title: 'ejs' });
});

/* GET home page. */
router.post('/', function(req, res) {
  users.getUserData(req.body.user,req.body.pass)
  .then(function(rows) {
  	console.log("mitko", rows);
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
      res.render('index', {});
    }
  });
});

module.exports = router;
