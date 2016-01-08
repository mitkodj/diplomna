var Q = require('Q');
var connection = require('../../utils/mysql_connection')();
var acAlg = require('../../utils/ahoCorasickAlgorithm');
var session = require('../../utils/session');

function getUserData(username, password) {
	var def = Q.defer();

	var query = ["SELECT UD.*, CS.IP, CS.rating",
		"FROM kursova_rabota.user_data UD",
		"LEFT JOIN kursova_rabota.client_status CS",
		"ON UD.Id = CS.distinctKey",
		"WHERE username='" + username + "'",
		"AND password='" + password + "'"
	].join(' ');

	// connection.query(query, function(err, rows, fields) {
	// 	if (err) def.reject(err);

	// 	def.resolve(rows);
	// });

	def.resolve([]);

	return def.promise;
}

function getUserDataByIP(username, password, IP) {
	var def = Q.defer();

	var query = ["SELECT UD.*, CS.IP, CS.rating",
		"FROM kursova_rabota.user_data UD",
		"LEFT JOIN kursova_rabota.client_status CS",
		"ON UD.Id = CS.distinctKey",
		"WHERE username='" + username + "'",
		"AND password='" + password + "'",
		"AND IP ='" + IP + "'"
	].join(' ');

	def.resolve([]);
	// connection.query(query, function(err, rows, fields) {
	// 	if (err) def.reject(err);

	// 	def.resolve(rows);
	// });

	return def.promise;
}

function saveUserInfo(user) {
	var query = ["INSERT INTO",
		"kursova_rabota.client_status(distinctKey, rating, IP)",
		"VALUES(",
		user.Id + ", ",
		user.rating + ", ",
		"'" + user.IP.trim() + "') ",
		"ON DUPLICATE KEY UPDATE",   
		"rating=" + user.rating
	].join(' ');

	// connection.query(query, function(err, rows, fields) {
	// 	if (err) throw err;

	// 	// console.log(rows);
	// });
}

module.exports = {
	    getUserData: getUserData,
	    saveUserInfo: saveUserInfo,
	    getUserDataByIP: getUserDataByIP
};