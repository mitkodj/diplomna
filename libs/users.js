var Q = require('Q');
var connection = require('./mysql_connection')();
var acAlg = require('./ahoCorasickAlgorithm');
var session = require('./session');

function getUserData(username, password) {
	var def = Q.defer();

	var query = ["SELECT UD.*, CS.IP, CS.rating",
	"FROM diplomna_rabota.user_data UD",
	"LEFT JOIN diplomna_rabota.client_status CS",
	"ON UD.Id = CS.distinctKey",
	"WHERE username='" + username + "'",
	"AND password='" + password + "'"
	].join(' ');

	connection.query(query, function(err, rows, fields) {
		if (err) def.reject(err);

		def.resolve(rows);
	});

	return def.promise;
}

function getUserDataByIP(username, password, IP) {
	var def = Q.defer();

	var query = ["SELECT UD.*, CS.IP, CS.rating",
	"FROM diplomna_rabota.user_data UD",
	"LEFT JOIN diplomna_rabota.client_status CS",
	"ON UD.Id = CS.distinctKey",
	"WHERE username='" + username + "'",
	"AND password='" + password + "'",
	"AND IP ='" + IP + "'"
	].join(' ');

	connection.query(query, function(err, rows, fields) {
		if (err) def.reject(err);

		def.resolve(rows);
	});

	return def.promise;
}

function saveUserInfo(user) {
	var query = ["INSERT INTO",
		"diplomna_rabota.client_status(distinctKey, rating, IP)",
		"VALUES(",
		user.Id + ", ",
		user.rating + ", ",
		"'" + user.IP.trim() + "') ",
		"ON DUPLICATE KEY UPDATE",   
		"rating=" + user.rating
		].join(' ');

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;

		console.log(rows);
	});
}

module.exports = {
	    getUserData: getUserData,
	    saveUserInfo: saveUserInfo,
	    getUserDataByIP: getUserDataByIP
};