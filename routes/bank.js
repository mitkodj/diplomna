var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var jade = require('jade');
var Random = require('random-js');

var session = require('../libs/session');
var banks = require('../libs/bank');
var users = require('../libs/users');
router.post('/', function(req, res) {
  console.log(req.body);
  banks.getBankData(req.body.iban)
  .then(function(rows) {
    console.log(rows);

    if (rows == "Attempted SQL Injection.") {
    	users.saveUserIP(session.currentUser);
    }
    res.send(rows);
    // if (rows.length == 1){
    //   var htmlOutput = {
    //     bank: {
    //       name: rows[0].username
    //     }
    //   };
    //   res.send('yay');
    // } else {
    //   res.send('nay');
    // }
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
    console.log(rows);

    if (rows == "Attempted SQL Injection.") {
    	users.saveUserIP(session.currentUser);
    }
    res.send(rows);
    // if (rows.length == 1){
    //   var htmlOutput = {
    //     bank: {
    //       name: rows[0].username
    //     }
    //   };
    //   res.send('yay');
    // } else {
    //   res.send('nay');
    // }
  });
});

module.exports = router;