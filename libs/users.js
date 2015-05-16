var Q = require('Q');
var connection = require('./mysql_connection')();
var acAlg = require('./ahoCorasickAlgorithm');

function getUserData(username, password) {
	var def = Q.defer();

	// connection.connect(function(err) {
	//   	if (err) {
	// 	  console.error('error connecting: ' + err.stack);
	// 	  return;
	// 	}

		console.log('connected as id ' + connection.threadId);

		var query = ["SELECT *",
		"FROM diplomna_rabota.user_data",
		"WHERE username='" + username + "'",
		"AND password='" + password + "'"
		].join(' ');
		// var query = "SELECT 1";
		console.log(query);

  		var result = SPMA(query, ["1=1"]);

		connection.query(query, function(err, rows, fields) {
			if (err) throw err;

			def.resolve(rows);
		});
	// });

	return def.promise;
}

function SPMA(query, SML) {
	return acAlg.SPMA(query, SML);
}

module.exports = {
	    getUserData: getUserData,
	    acAlgCall: SPMA
};