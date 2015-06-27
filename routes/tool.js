var express = require('express');
var router = express.Router();

var log4js = require('log4js');
var jade = require('jade');
var Random = require('random-js');
var async = require('async');
var _ = require('lodash');
var q = require('q');

var session = require('../libs/session');
var banks = require('../libs/bank');
var users = require('../libs/users');

var app = express();

var server = app.listen(3010);
var io = require('socket.io').listen(server);

var tracked = false;

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    io.sockets.emit('message', data);
  });
});

router.get('/', function(req, res) {
  res.render('tool', { title: 'Express' });
});

router.get('/track', function(req, res) {
  
  tracked = !tracked;
  res.send(tracked);
});

router.post('/req', function(req, res) {

        users.getUserDataByIP(req.body.username, req.body.password, req.body.IP)
        .then(function(rows){
            var currentUser = rows[0],
                currentStatus = 0;

            banks.getBankDataAsync(req.body.iban)
            .then(function(result) {
                console.log('CU: ??? ', currentUser);
                if (result == "Blind SQL Injection Anomaly Detected.") {
                    currentStatus = 1;
                    currentUser.rating = 1;
                    console.log('CU: <<< ', currentUser);
                }

                if (tracked) {
                    console.log({
                        username: req.body.username,
                        IP: req.body.IP,
                        rating: currentUser.rating
                    });
                    io.sockets.emit("newData", {
                        username: req.body.username,
                        IP: req.body.IP,
                        rating: currentUser.rating,
                        query: req.body.iban,
                        result: result
                    });
                }

                if (result == "Blind SQL Injection Anomaly Detected.") {
                    users.saveUserInfo(currentUser)
                    .then(function(r) {
                        console.log(r);

                    });
                }
            });
        });

  res.send(req.body);
});

router.get('/test', function(req, res) {

    var minVal = Random.integer(0, 6)(Random.engines.nativeMath);
    var maxVal = Random.integer(0, 10)(Random.engines.nativeMath);

    var requestQueries = [
        123456789,
        111111111,
        414141414,
        -111,
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
    for (var i=0; i < 30; i++) {
        randomNumbers.push(Random.integer(0, 3)(Random.engines.nativeMath));
    }

    var randomData = _.map(randomNumbers, function(element){
        return JSON.parse(JSON.stringify(users[element]));
    });

    randomNumbers = [];

    for (i=0; i < 30; i++) {
        var index = Random.integer(0, 10)(Random.engines.nativeMath);

        randomData[i].iban = requestQueries[index];

        var ip = Random.integer(0, 2)(Random.engines.nativeMath);

        randomData[i].IP = IPs[ip];
    }

    var groupedCollection = _.groupBy(randomData, function(element){
        return element.username + element.IP;
    });
    
    async.map(groupedCollection, iteratorFunction,
     function (err, results) {
        
        var resArray = _.flatten(_.values(results));
        res.send(resArray);
    });
});

function itFunc(element, callback) {
    banks.getBankDataAsync(element.iban)
    .then(function(result) {
        return callback(null, result);
    });
}

function iteratorFunction(group, cb) {
    var results = [];
    var currentStatus = 0;

    async.mapSeries(group, function(element, callback) {
            banks.getBankDataAsync(element.iban)
            .then(function(result) {
                
                if (result == "Blind SQL Injection Anomaly Detected.") {
                    currentStatus = 1;
                }

                callback(null, {
                    username: element.username,
                    IP: element.IP,
                    rating: currentStatus,
                    query: element.iban,
                    result: result
                });
            });
        }, function (err, resultGroup) {
            cb(err, resultGroup);
        });
}

function iterateUntil(array, results, i){
  // This line would eventually resolve the promise with something matching
  // the final ending condition.
  var element = array[i];
  return 
    banks.getBankData(element.iban)
    .then(function(result) {

        results.push(result);
      // If the promise was resolved with the loop end condition then you just
      // return the value or something, which will resolve the promise.
      if (i == array.length) return results;

      // Otherwise you call 'iterateUntil' again which will replace the current
      // promise with a new one that will do another iteration.
      else return iterateUntil(array, results, i + 1);
    });
}

module.exports = router;