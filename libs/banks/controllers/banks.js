var Q = require('Q');
var acAlg = require('../../utils/ahoCorasickAlgorithm');
var session = require('../../utils/session');
var log4js = require('log4js');
var jade = require('jade');
var Random = require('random-js');

function banksController(bankRepository, userRepository) {
	this.bankRepository = bankRepository;
	this.userRepository = userRepository;
}

banksController.prototype.getBankData = function (req, res) {
  this.bankRepository.getBankData(req.body.iban, this.SPMA)
  .then(function(rows) {

    if (rows == "Blind SQL Injection Anomaly Detected.") {
      console.log('Injection from ', session.currentUser);

      if (!req.body.test) {
        this.userRepository.saveUserInfo(session.currentUser);
      }
    }
    res.send(rows);
  });
};

banksController.prototype.getToolBankData = function(req, res) {
  this.bankRepository.getBankData(req.body.iban)
  .then(function(rows) {

    if (rows == "Blind SQL Injection Anomaly Detected.") {
    	this.userRepository.saveUserIP(session.currentUser);
    }
    
    res.send(rows);
  });
};

banksController.prototype.SPMA = function(query, SML) {
	return acAlg.SPMA(query, SML);
};

banksController.prototype.SPMA_test = function(query) {
	return acAlg.SPMA_test(query);
};

module.exports = function(bankRepository, userRepository) {
  return new banksController(bankRepository, userRepository);
};