var Q = require('Q');
var connection = require('./mysql_connection')();
var _ = require('lodash');
var machina = require('machina');

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
            1: "f1",
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
            1: "f3",
        	_onEnter: function() {
                console.log(this);
            },
            _reset: "uninitialized"
        },
        "f3": {
        	_onEnter: function() {
                console.log(this);
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
        this.handle( newState );
    	console.log(this.state);
    }
} );

function SPMA(query, SML) {
	sqlInjFSA.transitionState(SML[0][0]);
	sqlInjFSA.reset();
	var j = 0;
	for (; j < SML.length; j++) {
		var currentQuery = query;
		var i = currentQuery.indexOf(SML[j][0]);
		var checkResult;
		while (i >= 0) {
			currentQuery = currentQuery.substring(i);
			checkResult = ACAlg(currentQuery);
			if (checkResult == -1) {
				return "ccc";
			}
			currentQuery = currentQuery.substring(1);
			i = currentQuery.indexOf(SML[j][0]);
		}
	}
	return "hhhh";
	// console.log(sqlInjFSA.handle("1"));
}

function ACAlg(query) {
	var i = 0,
		n = query.length;
	for (; i < n; i++) {
		while (i < n && !(sqlInjFSA.transitionState(query.charAt(i)))) {
			sqlInjFSA.reset();
			i++;
		}
		if (i < n) {
			console.log('potential');
		}
	}

	return -1;
}

module.exports = {
	    SPMA: SPMA
};