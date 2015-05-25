var _ = require('lodash');

var automata = [{
		name: 'f0',
		transitions: [{
			t: 'u', s: 'f1'
		},{
			t: '@', s: 'f19'
		},{
			t: '0', s: 'f28'
		},{
			t: '1', s: 'f28'
		},{
			t: '2', s: 'f28'
		},{
			t: '3', s: 'f28'
		},{
			t: '4', s: 'f28'
		},{
			t: '5', s: 'f28'
		},{
			t: '6', s: 'f28'
		},{
			t: '7', s: 'f28'
		},{
			t: '8', s: 'f28'
		},{
			t: '9', s: 'f28'
		}],
		failTransition: 'f0'
	},{
		name: 'f1',
		transitions: [{
			t: 'n', s: 'f2'
		},{
			t: 's', s: 'f14'
		}],
		failTransition: 'f0'
	},{
		name: 'f2',
		transitions: [{
			t: 'i', s: 'f3'
		}],
		failTransition: 'f0'
	},{
		name: 'f3',
		transitions: [{
			t: 'o', s: 'f4'
		}],
		failTransition: 'f0'
	},{
		name: 'f4',
		transitions: [{
			t: 'n', s: 'f5'
		}],
		failTransition: 'f0'
	},{
		name: 'f5',
		transitions: [{
			t: ' ', s: 'f5'
		},{
			t: 'a', s: 'f6'
		},{
			t: 's', s: 'f8'
		}],
		failTransition: 'f0'
	},{
		name: 'f6',
		transitions: [{
			t: 'l', s: 'f7'
		}],
		failTransition: 'f0'
	},{
		name: 'f7',
		transitions: [{
			t: 'l', s: 'f5'
		}],
		failTransition: 'f0'
	},{
		name: 'f8',
		transitions: [{
			t: 'e', s: 'f9'
		}],
		failTransition: 'f0'
	},{
		name: 'f9',
		transitions: [{
			t: 'l', s: 'f10'
		}],
		failTransition: 'f0'
	},{
		name: 'f10',
		transitions: [{
			t: 'e', s: 'f11'
		}],
		failTransition: 'f0'
	},{
		name: 'f11',
		transitions: [{
			t: 'c', s: 'f12'
		}],
		failTransition: 'f0'
	},{
		name: 'f12',
		transitions: [{
			t: 't', s: 'f3'
		}],
		failTransition: 'f0'
	},{
		name: 'f13',
		transitions: [],
		failTransition: 'f0'
	},{
		name: 'f14',
		transitions: [{
			t: 'e', s: 'f15'
		}],
		failTransition: 'f0'
	},{
		name: 'f15',
		transitions: [{
			t: 'r', s: 'f16'
		}],
		failTransition: 'f0'
	},{
		name: 'f16',
		transitions: [{
			t: '(', s: 'f17'
		}],
		failTransition: 'f0'
	},{
		name: 'f17',
		transitions: [{
			t: ')', s: 'f18'
		}],
		failTransition: 'f0'
	},{
		name: 'f18',
		transitions: [],
		failTransition: 'f0'
	},{
		name: 'f19',
		transitions: [{
			t: '@', s: 'f20'
		}],
		failTransition: 'f0'
	},{
		name: 'f20',
		transitions: [{
			t: 'v', s: 'f21'
		}],
		failTransition: 'f0'
	},{
		name: 'f21',
		transitions: [{
			t: 'e', s: 'f22'
		}],
		failTransition: 'f0'
	},{
		name: 'f22',
		transitions: [{
			t: 'r', s: 'f23'
		}],
		failTransition: 'f0'
	},{
		name: 'f23',
		transitions: [{
			t: 's', s: 'f24'
		}],
		failTransition: 'f0'
	},{
		name: 'f24',
		transitions: [{
			t: 'i', s: 'f25'
		}],
		failTransition: 'f0'
	},{
		name: 'f25',
		transitions: [{
			t: 'o', s: 'f26'
		}],
		failTransition: 'f0'
	},{
		name: 'f26',
		transitions: [{
			t: 'n', s: 'f27'
		}],
		failTransition: 'f0'
	},{
		name: 'f27',
		transitions: [],
		failTransition: 'f0'
	},{
		name: 'f28',
		transitions: [{
			t: '=', s: 'f29'
		}],
		failTransition: 'f0'
	},{
		name: 'f29',
		transitions: [{
			t: '0', s: 'f30'
		},{
			t: '1', s: 'f30'
		},{
			t: '2', s: 'f30'
		},{
			t: '3', s: 'f30'
		},{
			t: '4', s: 'f30'
		},{
			t: '5', s: 'f30'
		},{
			t: '6', s: 'f30'
		},{
			t: '7', s: 'f30'
		},{
			t: '8', s: 'f30'
		},{
			t: '9', s: 'f30'
		}],
		failTransition: 'f0'
	},{
		name: 'f30',
		transitions: [],
		failTransition: 'f0'
	}];

var finalStates = ['f13', 'f18', 'f27', 'f30'];

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