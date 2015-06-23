var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var jade = require('jade');
var Random = require('random-js');

var session = require('../libs/session');
var banks = require('../libs/bank');
var users = require('../libs/users');

router.post('/', function(req, res) {
  banks.getBankData(req.body.iban)
  .then(function(rows) {

    if (rows == "Blind SQL Injection Anomaly Detected.") {
      console.log('Injection from ', session.currentUser);

      if (!req.body.test) {
        users.saveUserInfo(session.currentUser);
      }
    	// users.saveUserIP(session.currentUser);
    }
    res.send(rows);
  });
});

router.post('/tool', function(req, res) {

  banks.getBankData(req.body.iban)
  .then(function(rows) {

    if (rows == "Blind SQL Injection Anomaly Detected.") {
    	users.saveUserIP(session.currentUser);
    }
    res.send(rows);
  });
});

module.exports = router;