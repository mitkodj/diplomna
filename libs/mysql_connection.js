var mysql = require('mysql');
var config = require('../config/config');

var connection = mysql.createConnection({
  host     : 'localhost',
  user	   : 'root'
});

module.exports = function() {
	// console.log(connection);
	return connection;
}