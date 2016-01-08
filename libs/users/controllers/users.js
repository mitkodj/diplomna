var Q = require('Q');
var acAlg = require('../../utils/ahoCorasickAlgorithm');
var session = require('../../utils/session');
var log4js = require('log4js');
var jade = require('jade');

function usersController(repository) {

	this.repository = repository;
}

usersController.prototype.setUserData = function(req, res) {
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
};

usersController.prototype.getUserData = function(req, res) {
  users.getUserData(1)
  .then(function(rows) {
	  res.send(rows);
  });
}

module.exports = function (repository){
	return new usersController(repository);
};