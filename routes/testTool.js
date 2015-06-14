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
io.on('connection', function (socket) {
    console.log("socket");
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
    io.sockets.emit('message', data);
  // console.log('a user connected');
  });
});

router.get('/', function(req, res) {
  res.render('testTool', { title: 'Express' });
});

router.post('/req', function(req, res) {
  // res.render('testTool', { title: 'Express' });
  console.log('1111', req.body);
  // banks.getBankDataAsync(req.body.iban)
  //   .then(function(result) {
  //       // console.log(element.iban, result);
  //       // if (result == "Blind SQL Injection Anomaly Detected.") {
  //       //     currentStatus = 1;
  //       // }
  //       // console.log(element.iban, result);
  //       if (result == "Blind SQL Injection Anomaly Detected.") {
  //           currentStatus = 1;
  //       }
  //       // console.log(status);

        users.getUserDataByIP(req.body.username, req.body.password, req.body.IP)
        .then(function(rows){
            console.log(rows);
            var currentUser = rows[0],
                currentStatus = 0;

            banks.getBankDataAsync(req.body.iban)
            .then(function(result) {
                if (result == "Blind SQL Injection Anomaly Detected.") {
                    currentStatus = 1;
                    currentUser.rating = 1;
                }

                console.log('emit');
                io.sockets.emit("newData", {
                    username: req.body.username,
                    IP: req.body.IP,
                    rating: currentStatus,
                    query: req.body.iban,
                    result: result
                });

                if (result == "Blind SQL Injection Anomaly Detected.") {
                    users.saveUserInfo(currentUser)
                    .then(function(r) {
                        console.log(r);

                    });
                }
            });
        });

    // });
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
        // return users[element];
        return JSON.parse(JSON.stringify(users[element]));
    });

    // console.log(randomData);

    randomNumbers = [];

    for (i=0; i < 30; i++) {
        var index = Random.integer(0, 10)(Random.engines.nativeMath);

        randomData[i].iban = requestQueries[index];

        var ip = Random.integer(0, 2)(Random.engines.nativeMath);

        randomData[i].IP = IPs[ip];
        // console.log(i,randomData[i].username, ip, randomData[i].IP);
    }

    // console.log('=================');

    // for (i=0; i<20;i++) {
    //     console.log(i, randomData[i].username, randomData[i].IP);
    // }

    var groupedCollection = _.groupBy(randomData, function(element){
        return element.username + element.IP;
    });
    // console.log(groupedCollection);
    console.log('=====111============');
    // for (i=0; i<groupedCollection.length;i++) {
    //     console.log(i, groupedCollection[i].length);
    // }

    async.map(groupedCollection, iteratorFunction,
     function (err, results) {
        // console.log("Finished!");
        // console.log(err,results);
        var resArray = _.flatten(_.values(results));
        res.send(resArray);
    });

    // async.each(groupedCollection, iteratorFunction,
    //  function (err, results) {
    //     // console.log(results);
    //     res.send(results);
    // });

    // res.send(groupedCollection);
    // res.send(randomData);
});

function itFunc(element, callback) {
    banks.getBankDataAsync(element.iban)
    .then(function(result) {
        // console.log('----',element.iban, result);
        return callback(null, result);
    });
    // return callback(undefined, 1);
}

function iteratorFunction(group, cb) {
    var results = [];
    var currentStatus = 0;
    // console.log(group.length);

    async.mapSeries(group, function(element, callback) {
            // console.log(element.iban);
            banks.getBankDataAsync(element.iban)
            .then(function(result) {
                // console.log(element.iban, result);
                // if (result == "Blind SQL Injection Anomaly Detected.") {
                //     currentStatus = 1;
                // }
                // console.log(element.iban, result);
                if (result == "Blind SQL Injection Anomaly Detected.") {
                    currentStatus = 1;
                }
                // console.log(status);
                callback(null, {
                    username: element.username,
                    IP: element.IP,
                    rating: currentStatus,
                    query: element.iban,
                    result: result
                });
            });
        }, function (err, resultGroup) {
            // console.log('>>>', err, resultGroup);
            cb(err, resultGroup);
        });
}

function iterateUntil(array, results, i){
  // This line would eventually resolve the promise with something matching
  // the final ending condition.
  var element = array[i];
  console.log(element.iban);
  return 
    banks.getBankData(element.iban)
    .then(function(result) {

        console.log(result);
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