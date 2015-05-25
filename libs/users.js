var Q = require('Q');
var connection = require('./mysql_connection')();
var acAlg = require('./ahoCorasickAlgorithm');
var session = require('./session');

function getUserData(username, password) {
	var def = Q.defer();

	// connection.connect(function(err) {
	//   	if (err) {
	// 	  console.error('error connecting: ' + err.stack);
	// 	  return;
	// 	}

		console.log('connected as id ' + connection.threadId);

		var query = ["SELECT UD.*, CS.IP, CS.rating",
		"FROM diplomna_rabota.user_data UD",
		"LEFT JOIN diplomna_rabota.client_status CS",
		"ON UD.Id = CS.distinctKey",
		"WHERE username='" + username + "'",
		"AND password='" + password + "'"
		].join(' ');

		console.log(query);

		connection.query(query, function(err, rows, fields) {
			if (err) def.reject(err);

			def.resolve(rows);
		});
	// });

	return def.promise;
}

function saveUserIP(user) {
	console.log("in saveUserIP", user);
	var query = ["INSERT INTO",
		"diplomna_rabota.client_status(distinctKey, rating, IP)",
		"VALUES(",
		user.Id + ", ",
		user.rating + ", '",
		user.IP + "') ",
		"ON DUPLICATE KEY UPDATE",   
		"rating=" + user.rating
		].join(' ');
		console.log(query);

		connection.query(query, function(err, rows, fields) {
			if (err) throw err;

			console.log(rows);
		});
}

function SPMA(query, SML) {
	console.log(session.currentUser);
	return acAlg.SPMA(query, SML);
}

module.exports = {
	    getUserData: getUserData,
	    acAlgCall: SPMA,
	    saveUserIP: saveUserIP
};