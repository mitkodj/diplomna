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
	// var query = "SELECT 1";
	console.log(query);

	var result = SPMA(query);
	console.log(result);
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

	var query = ["SELECT BD.withrawal, I.IBAN, B.bankName",
	"FROM diplomna_rabota.bank_data BD",
	"LEFT JOIN diplomna_rabota.ibans I",
	"ON I.Id = BD.IBAN",
	"LEFT JOIN diplomna_rabota.banks B",
	"ON B.Id = I.bankId",
	"WHERE I.IBAN = " + iban
	].join(' ');
	// var query = "SELECT 1";
	console.log(query);

	var result = SPMA(query);
	// console.log(result);
	if (result) {
		// console.log("The SQL Inj");
		session.currentUser.rating = 1;
		console.log("The SQL Inj from ", session.currentUser);
	}

	if (!result) {
		connection.query(query, function(err, rows, fields) {
			if (err) {
				callback(err, null);
			}

			return callback(null, {
				query: query,
				user_status: session.currentUser.rating,
				results: rows.length + " rows as result"
			});
			// def.resolve(rows);
		});	
	} else {
		// def.resolve("Attempted SQL Injection.");
		return callback(null, {
			query: query,
			user_status: session.currentUser.rating,
			results: "Attempted SQL Injection."
		});
		// return callback(null, "Attempted SQL Injection.");
	}
}

function SPMA(query, SML) {
	return acAlg.SPMA(query, SML);
}

module.exports = {
	    getBankData: getBankData,
	    getBankDataAsync: getBankDataAsync
};