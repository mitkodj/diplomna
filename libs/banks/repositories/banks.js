var Q = require('Q');
var connection = require('../../utils/mysql_connection')();
var session = require('../../utils/session');

function getBankData(iban, SPMA) {
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
		// connection.query(query, function(err, rows, fields) {
		// 	if (err) throw err;

		// 	def.resolve(rows);
		// });	
		def.resolve({withrawal: 5000, IBAN: '34567890', bankName: 'Reiffeisen'});
	} else {
		def.resolve("Blind SQL Injection Anomaly Detected.")
	}

	return def.promise;
}

function getBankDataAsync(iban, SPMA_test, callback) {

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
		// connection.query(query, function(err, rows, fields) {
		// 	if (err) throw err;

		// 	def.resolve(rows);
		// });	
		def.resolve({withrawal: 5000, IBAN: '34567890', bankName: 'Reiffeisen'});
	} else {
		def.resolve("Blind SQL Injection Anomaly Detected.")
	}

	return def.promise;
}

module.exports = {
	    getBankData: getBankData,
	    getBankDataAsync: getBankDataAsync
};