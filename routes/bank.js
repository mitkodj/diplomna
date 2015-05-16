var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var jade = require('jade');

var bank = require('../libs/bank');
router.post('/', function(req, res) {
  console.log(req.body);
  bank.getBankData(req.body.iban)
  .then(function(rows) {
    console.log(rows);
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