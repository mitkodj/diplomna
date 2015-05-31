var Q = require('Q');
var connection = require('./mysql_connection')();
var _ = require('lodash');
var machina = require('machina');
var DFA = require('./DFA');
var session = require('./session');

var sqlInjFSA = new machina.Fsm( {
 
    // the initialize method is called right after the FSM 
    // instance is constructed, giving you a place for any 
    // setup behavior, etc. It receives the same arguments 
    // (options) as the constructor function. 
    initialize: function( options ) {
        // your setup code goes here... 
    },
 
    namespace: "vehicle-signal",
 
    // `initialState` tells machina what state to start the FSM in. 
    // The default value is "uninitialized". Not providing 
    // this value will throw an exception in v1.0+ 
    initialState: "uninitialized",
 
    // The states object's top level properties are the 
    // states in which the FSM can exist. Each state object 
    // contains input handlers for the different inputs 
    // handled while in that state. 
    states: {
        uninitialized: {
            0: "f1",
            1: "f1",
            2: "f1",
            3: "f1",
            4: "f1",
            5: "f1",
            6: "f1",
            7: "f1",
            8: "f1",
            9: "f1",
            // '1': "f1",
            _reset: "uninitialized"
        },
        "f1": {
            // _onEnter is a special handler that is invoked 
            // immediately as the FSM transitions into the new state 
            // _onEnter: function() {
            //     this.timer = setTimeout( function() {
            //         this.handle( "timeout" );
            //     }.bind( this ), 30000 );
            //     this.emit( "vehicles", { status: GREEN } );
            // },
            // // If all you need to do is transition to a new state 
            // // inside an input handler, you can provide the string 
            // // name of the state in place of the input handler function. 
            // timeout: "green-interruptible",
            // pedestrianWaiting: function() {
            //     this.deferUntilTransition( "green-interruptible" );
            // },
            // // _onExit is a special handler that is invoked just before 
            // // the FSM leaves the current state and transitions to another 
            // _onExit: function() {
            //     clearTimeout( this.timer );
            // }
        	_onEnter: function() {
                console.log(this);
            },
            '=': "f2",
            _reset: "uninitialized"
        },
        "f2": {
        	_onEnter: function() {
                console.log(this);
            },
            0: "f3",
            1: "f3",
            2: "f3",
            3: "f3",
            4: "f3",
            5: "f3",
            6: "f3",
            7: "f3",
            8: "f3",
            9: "f3",
        	_onEnter: function() {
                console.log(this);
            },
            _reset: "uninitialized"
        },
        "f3": {
        	_onEnter: function() {
                console.log("FINAL STATE",this);
            },
            _reset: "uninitialized"
        }
    },
 
    // While you can call the FSM's `handle` method externally, it doesn't 
    // make for a terribly expressive API. As a general rule, you wrap calls 
    // to `handle` with more semantically meaningful method calls like these: 
    reset: function() {
        this.handle( "_reset" );
    },
 
    transitionState: function(newState) {
    	console.log(this.state);

        if (!this.handle( newState )) {
            
        this.handle( "_reset" );

        }
        // this.handle( newState );
    	console.log(this.state);
    }
} );

// var currentUser = {
// 	userID: 1,
// 	IP: '127.0.0.1',
// 	status: 0
// };

function SPMA(query) {
    session.currentUser.rating = 0;
	DFA.reset();
	var j = 0;
	// for (; j < SML.length; j++) {
	// 	var currentQuery = query;
	// 	var i = currentQuery.indexOf(SML[j][0]);
	// 	var checkResult;
	// 	console.log(j,i,currentQuery,SML[j]);
	// 	while (i >= 0) {
	// 		currentQuery = currentQuery.substring(i);
	// 		console.log(currentQuery);
	// 		checkResult = ACAlg(currentQuery);
	// 		if (checkResult > -1) {
	// 			currentUser.status = 1;
	// 			currentQuery = currentQuery.substring(checkResult);
	// 		} else {
	// 			currentQuery = currentQuery.substring(1);
	// 		}
	// 		i = currentQuery.indexOf(SML[j][0]);
	// 	}
	// }
    var i = query.indexOf('WHERE');
    var currentQuery = query.substring(i + 5);
    console.log(currentQuery);
    var checkResult = ACAlg(currentQuery);
     if (checkResult > -1) {
         session.currentUser.rating = 1;
         console.log(session.currentUser);
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

function ACAlg(query) {
	var i = 0,
		n = query.length,
		returnedResult = -1;
    console.log(query, n);
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
	    SPMA: SPMA
};