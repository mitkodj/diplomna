var Q = require('Q');
var connection = require('./mysql_connection')();
var acAlg = require('./ahoCorasickAlgorithm');

function getUserData(userID) {
	var def = Q.defer();

	connection.connect(function(err) {
	  	if (err) {
		  console.error('error connecting: ' + err.stack);
		  return;
		}

		console.log('connected as id ' + connection.threadId);

		var query = "SELECT * FROM diplomna_rabota.client_status";
		// var query = "SELECT 1";


		connection.query(query, function(err, rows, fields) {
			if (err) throw err;

			console.log('The solution is: ', rows);
			def.resolve(rows);
		});
	});

	return def.promise;
}

function login(params) {
}

function SPMA(query, SML) {
	return acAlg.SPMA(query, SML);
}

module.exports = {
	    getUserData: getUserData, 
	    login: login,
	    acAlgCall: SPMA
};