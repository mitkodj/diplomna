var Q = require('Q');
var connection = require('./mysql_connection')();
var _ = require('lodash');
var machina = require('machina');
var DFA = require('./DFA');
var session = require('./session');

function SPMA(query) {
	DFA.reset();
	var j = 0;
    var i = query.indexOf('WHERE');
    var currentQuery = query.substring(i + 5);
    // console.log(currentQuery);
    var checkResult = ACAlg(currentQuery);
     if (checkResult > -1) {
         session.currentUser.rating = 1;
         // console.log(session.currentUser);
         currentQuery = currentQuery.substring(checkResult);
     } else {
         currentQuery = currentQuery.substring(1);
     }
	if (session.currentUser.rating > 0) {
		return true;
	} else {
		return false;
	}
}


function SPMA_test(query) {
    DFA.reset();
    var j = 0;
    var i = query.indexOf('WHERE');
    var currentQuery = query.substring(i + 5);
    var rating = 0;
    // console.log(currentQuery);
    var checkResult = ACAlg(currentQuery);
     if (checkResult > -1) {
         rating = 1;
         // console.log(session.currentUser);
         // currentQuery = currentQuery.substring(checkResult);
     } 
     // else {
     //     currentQuery = currentQuery.substring(1);
     // }
    if (rating > 0) {
        return true;
    } else {
        return false;
    }
}

function ACAlg(query) {
	var i = 0,
		n = query.length,
		returnedResult = -1;
    // console.log(query, n);
	for (; i < n; i++) {
		while (i < n && !(DFA.transition(query.charAt(i)))) {
			DFA.reset();

            if (!(DFA.transition(query.charAt(i)))) {
                DFA.reset();
            }
			i++;
		}
		if (i < n && DFA.isInFinalState()) {
			returnedResult = i;
            return returnedResult;
		}
	}

	return returnedResult;
}

module.exports = {
	    SPMA: SPMA,
        SPMA_test: SPMA_test
};