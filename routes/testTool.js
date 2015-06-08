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

    var ratings = {
        'mitko': {
            '127.0.0.1': 0,
            '192.167.11.203': 0,
            '68.191.13.44': 0
        },
        'mira': {
            '127.0.0.1': 0,
            '192.167.11.203': 0,
            '68.191.13.44': 0
        },
        'ivan': {
            '127.0.0.1': 0,
            '192.167.11.203': 0,
            '68.191.13.44': 0
        },
        'test_user': {
            '127.0.0.1': 0,
            '192.167.11.203': 0,
            '68.191.13.44': 0
        }
    };

    var users = [{
        Id: 1,
        username: 'mitko',
        password: 'dimitar'
    }, {
        Id: 2,
        username: 'mira',
        password: '12345'
    }, {
        Id: 3,
        username: 'ivan',
        password: '0000'
    }, {
        Id: 4,
        username: 'test_user',
        password: 'test'
    }];

    var IPs = [
        '127.0.0.1',
        '192.167.11.203',
        '68.191.13.44'
    ];

    var randomNumbers = [];
    for (var i=0; i < 20; i++) {
        randomNumbers.push(Random.integer(0, 3)(Random.engines.nativeMath));
    }

    var randomData = _.map(randomNumbers, function(element){
        // return users[element];
        return JSON.parse(JSON.stringify(users[element]));
    });

    // console.log(randomData);

    randomNumbers = [];

    for (i=0; i < 20; i++) {
        var index = Random.integer(0, 10)(Random.engines.nativeMath);

        randomData[i].query = requestQueries[index];

        var ip = Random.integer(0, 2)(Random.engines.nativeMath);

        randomData[i].IP = IPs[ip];
        console.log(i,randomData[i].username, ip, randomData[i].IP);
    }

    console.log('=================');

    for (i=0; i<20;i++) {
        console.log(i, randomData[i].username, randomData[i].IP);
    }

    var groupedCollection = _.groupBy(randomData, function(element){
        return element.username + element.IP
    });

    // async.map(randomData, function() {

    // }, function (err, results) {
        // res.send(results);
    // });

    res.send(groupedCollection);
    // res.send(randomData);
});

module.exports = router;