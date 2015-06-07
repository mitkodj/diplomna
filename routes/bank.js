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
    	users.saveUserIP(session.currentUser);
    }
    res.send(rows);
  });
});

router.post('/testTool', function(req, res) {

	var minVal = Random.integer(1, 10)(Random.engines.nativeMath);
	var maxVal = Random.integer(1, 10)(Random.engines.nativeMath);

	var requestQueries = [
		123456789,
		111111111,
		414141414,
		-111,
		"1 OR 1=1",
		"1 AND " + minVal + "=" + maxVal,
		"1 UNION SELECT @@version, 1, 1",
		"1 UNION SELECT version(), 1, 1",
	];
  banks.getBankData(req.body.iban)
  .then(function(rows) {

    if (rows == "Blind SQL Injection Anomaly Detected.") {
    	users.saveUserIP(session.currentUser);
    }
    res.send(rows);
  });
});

module.exports = router;