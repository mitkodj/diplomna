var Q = require('Q');
var connection = require('./mysql_connection')();
var acAlg = require('./ahoCorasickAlgorithm');

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

		// var result = SPMA(query, ["1=1"]);

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;

		def.resolve(rows);
	});

	return def.promise;
}

module.exports = {
	    getBankData: getBankData
};