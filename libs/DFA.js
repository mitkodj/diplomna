var _ = require('lodash');

var automata = [{
		name: 'f0',
		transitions: [{
			t: '1', s: 'f1'
		}],
		failTransition: 'f0'
	}, {
		name: 'f1',
		transitions: [{
			t: '=', s: 'f2'
		}],
		failTransition: 'f0'
	}, {
		name: 'f2',
		transitions: [{
			t: '1', s: 'f3'
		}],
		failTransition: 'f0'
	}, {
		name: 'f3',
		transitions: [],
		failTransition: 'f0'
	}];

var finalStates = ['f3'];

var currentState = automata[0];

function getStateByName(name){
	for (var i = automata.length - 1; i >= 0; i--) {
		if (automata[i].name == name) {
			return automata[i];
		}
	};

	return undefined;
}

function transition(term){
	console.log(term, currentState.transitions);
	for (var i = 0; i < currentState.transitions.length; i++) {
		console.log(currentState.transitions[i].t, term);
		if (currentState.transitions[i].t == term) {
			currentState = getStateByName(currentState.transitions[i].s);
			console.log(currentState);
			return true;
		}
	};

	return false;
}

function isInFinalState(){
	return _.indexOf( finalStates, currentState.name) >= 0;
}

function reset(){
	currentState = getStateByName(currentState.failTransition);
}

function getCurrentState(){
	return currentState;
}

module.exports = {
		getStateByName: getStateByName,
	    transition: transition, 
	    isInFinalState: isInFinalState,
	    reset: reset,
	    getCurrentState: getCurrentState
};