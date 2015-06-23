var Q = require('Q');
var connection = require('./mysql_connection')();
var acAlg = require('./ahoCorasickAlgorithm');
var session = require('./session');

function getBankData(iban) {
	var def = Q.defer();

	var query = ["SELECT BD.withrawal, I.IBAN, B.bankName",
	"FROM diplomna_rabota.bank_data BD",
	"LEFT JOIN diplomna_rabota.ibans I",
	"ON I.Id = BD.IBAN",
	"LEFT JOIN diplomna_rabota.banks B",
	"ON B.Id = I.bankId",
	"WHERE I.IBAN = " + iban
	].join(' ');

	var result = SPMA(query);

	if (result) {
		session.currentUser.rating = 1;
	}

	if (!result) {
		connection.query(query, function(err, rows, fields) {
			if (err) throw err;

			def.resolve(rows);
		});	
	} else {
		def.resolve("Blind SQL Injection Anomaly Detected.")
	}

	return def.promise;
}

function getBankDataAsync(iban, callback) {

	var def = Q.defer();

	var query = ["SELECT BD.withrawal, I.IBAN, B.bankName",
	"FROM diplomna_rabota.bank_data BD",
	"LEFT JOIN diplomna_rabota.ibans I",
	"ON I.Id = BD.IBAN",
	"LEFT JOIN diplomna_rabota.banks B",
	"ON B.Id = I.bankId",
	"WHERE I.IBAN = " + iban
	].join(' ');

	var result = SPMA_test(query);

	if (!result) {
		connection.query(query, function(err, rows, fields) {
			if (err) throw err;

			def.resolve(rows);
		});	
	} else {
		def.resolve("Blind SQL Injection Anomaly Detected.")
	}

	return def.promise;
}

function SPMA(query, SML) {
	return acAlg.SPMA(query, SML);
}

function SPMA_test(query) {
	return acAlg.SPMA_test(query);
}

module.exports = {
	    getBankData: getBankData,
	    getBankDataAsync: getBankDataAsync
};