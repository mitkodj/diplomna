var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var jade = require('jade');
var Random = require('random-js');
var async = require('async');
var _ = require('lodash');

var session = require('../libs/session');
var banks = require('../libs/bank');

router.get('/', function(req, res) {
  res.render('testTool', { title: 'Express' });
});

router.get('/test', function(req, res) {

	var minVal = Random.integer(0, 6)(Random.engines.nativeMath);
	var maxVal = Random.integer(0, 10)(Random.engines.nativeMath);

	var requestQueries = [
		123456789,
		111111111,
		414141414,
		-111,
		"1 OR 1=1",
		"1 AND " + minVal + "=" + maxVal,
		"1 UNION SELECT @@version, 1, 1",
		"1 UNION SELECT version(), 1, 1",
        "1 UNION SELECT @@datadir, 1, 1",
        "1 UNION SELECT database(), 1, 1",
        "1 UNION SELECT @@hostname, 1, 1", 
	];

    var randomNumbers = [];
    for (var i=0; i < minVal; i++) {
        randomNumbers.push(Random.integer(0, 3)(Random.engines.nativeMath));
    }

    for (i=0; i < 10 - minVal; i++) {
        randomNumbers.push(Random.integer(0, 10)(Random.engines.nativeMath));
    }
    console.log(minVal, 10 - minVal);

    randomNumbers = _.map(randomNumbers, function(element){
        return requestQueries[element];
    });

    async.map(randomNumbers, banks.getBankDataAsync, function (err, results) {
        res.send(results);
    });
});

module.exports = router;