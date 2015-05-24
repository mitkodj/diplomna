var _ = require('lodash');

var automata = [{
		name: 'f0',
		transitions: [{
			t: '0', s: 'f1'
		},{
			t: '1', s: 'f1'
		},{
			t: '2', s: 'f1'
		},{
			t: '3', s: 'f1'
		},{
			t: '4', s: 'f1'
		},{
			t: '5', s: 'f1'
		},{
			t: '6', s: 'f1'
		},{
			t: '7', s: 'f1'
		},{
			t: '8', s: 'f1'
		},{
			t: '9', s: 'f1'
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
			t: '0', s: 'f3'
		},{
			t: '1', s: 'f3'
		},{
			t: '2', s: 'f3'
		},{
			t: '3', s: 'f3'
		},{
			t: '4', s: 'f3'
		},{
			t: '5', s: 'f3'
		},{
			t: '6', s: 'f3'
		},{
			t: '7', s: 'f3'
		},{
			t: '8', s: 'f3'
		},{
			t: '9', s: 'f3'
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