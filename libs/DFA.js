var _ = require('lodash');

var automata = [{
		name: 'f0',
		transitions: [{
			t: ' ', s: 'f1'
		}],
		failTransition: 'f0'
	},{
		name: 'f1',
		transitions: [{
			t: '@', s: 'f2'
		},{
			t: 'a', s: 'f5'
		},{
			t: 'b', s: 'f5'
		},{
			t: 'd', s: 'f5'
		},{
			t: 'e', s: 'f5'
		},{
			t: 'f', s: 'f5'
		},{
			t: 'i', s: 'f5'
		},{
			t: 'n', s: 'f5'
		},{
			t: 'o', s: 'f5'
		},{
			t: 'r', s: 'f5'
		},{
			t: 's', s: 'f5'
		},{
			t: 't', s: 'f5'
		},{
			t: 'v', s: 'f5'
		},{
			t: '0', s: 'f8'
		},{
			t: '1', s: 'f8'
		},{
			t: '2', s: 'f8'
		},{
			t: '3', s: 'f8'
		},{
			t: '4', s: 'f8'
		},{
			t: '5', s: 'f8'
		},{
			t: '6', s: 'f8'
		},{
			t: '7', s: 'f8'
		},{
			t: '8', s: 'f8'
		},{
			t: '9', s: 'f8'
		}],
		failTransition: 'f0'
	},{
		name: 'f2',
		transitions: [{
			t: '@', s: 'f3'
		}],
		failTransition: 'f0'
	},{
		name: 'f3',
		transitions: [{
			t: 'a', s: 'f4'
		},{
			t: 'b', s: 'f4'
		},{
			t: 'd', s: 'f4'
		},{
			t: 'e', s: 'f4'
		},{
			t: 'h', s: 'f4'
		},{
			t: 'i', s: 'f4'
		},{
			t: 'm', s: 'f4'
		},{
			t: 'n', s: 'f4'
		},{
			t: 'o', s: 'f4'
		},{
			t: 'r', s: 'f4'
		},{
			t: 's', s: 'f4'
		},{
			t: 't', s: 'f4'
		},{
			t: 'v', s: 'f4'
		}],
		failTransition: 'f0'
	},{
		name: 'f4',
		transitions: [{
			t: 'a', s: 'f4'
		},{
			t: 'b', s: 'f4'
		},{
			t: 'd', s: 'f4'
		},{
			t: 'e', s: 'f4'
		},{
			t: 'h', s: 'f4'
		},{
			t: 'i', s: 'f4'
		},{
			t: 'm', s: 'f4'
		},{
			t: 'n', s: 'f4'
		},{
			t: 'o', s: 'f4'
		},{
			t: 'r', s: 'f4'
		},{
			t: 's', s: 'f4'
		},{
			t: 't', s: 'f4'
		},{
			t: 'v', s: 'f4'
		}],
		failTransition: 'f0'
	},{
		name: 'f5',
		transitions: [{
			t: 'a', s: 'f5'
		},{
			t: 'b', s: 'f5'
		},{
			t: 'd', s: 'f5'
		},{
			t: 'e', s: 'f5'
		},{
			t: 'f', s: 'f5'
		},{
			t: 'i', s: 'f5'
		},{
			t: 'n', s: 'f5'
		},{
			t: 'o', s: 'f5'
		},{
			t: 'r', s: 'f5'
		},{
			t: 's', s: 'f5'
		},{
			t: 't', s: 'f5'
		},{
			t: 'v', s: 'f5'
		},{
			t: '(', s: 'f6'
		}],
		failTransition: 'f0'
	},{
		name: 'f6',
		transitions: [{
			t: 'a', s: 'f6'
		},{
			t: 'b', s: 'f6'
		},{
			t: 'd', s: 'f6'
		},{
			t: 'e', s: 'f6'
		},{
			t: 'f', s: 'f6'
		},{
			t: 'h', s: 'f6'
		},{
			t: 'i', s: 'f6'
		},{
			t: 'n', s: 'f6'
		},{
			t: 'o', s: 'f6'
		},{
			t: 'r', s: 'f6'
		},{
			t: 's', s: 'f6'
		},{
			t: 't', s: 'f6'
		},{
			t: 'v', s: 'f6'
		},{
			t: '0', s: 'f6'
		},{
			t: '1', s: 'f6'
		},{
			t: '2', s: 'f6'
		},{
			t: '3', s: 'f6'
		},{
			t: '4', s: 'f6'
		},{
			t: '5', s: 'f6'
		},{
			t: '6', s: 'f6'
		},{
			t: '7', s: 'f6'
		},{
			t: '8', s: 'f6'
		},{
			t: '9', s: 'f6'
		},{
			t: ',', s: 'f6'
		},{
			t: '(', s: 'f6'
		},{
			t: ')', s: 'f7'
		}],
		failTransition: 'f0'
	},{
		name: 'f7',
		transitions: [],
		failTransition: 'f0'
	},{
		name: 'f8',
		transitions: [{
			t: '0', s: 'f8'
		},{
			t: '1', s: 'f8'
		},{
			t: '2', s: 'f8'
		},{
			t: '3', s: 'f8'
		},{
			t: '4', s: 'f8'
		},{
			t: '5', s: 'f8'
		},{
			t: '6', s: 'f8'
		},{
			t: '7', s: 'f8'
		},{
			t: '8', s: 'f8'
		},{
			t: '9', s: 'f8'
		},{
			t: '=', s: 'f9'
		}],
		failTransition: 'f0'
	},{
		name: 'f9',
		transitions: [{
			t: '0', s: 'f10'
		},{
			t: '1', s: 'f10'
		},{
			t: '2', s: 'f10'
		},{
			t: '3', s: 'f10'
		},{
			t: '4', s: 'f10'
		},{
			t: '5', s: 'f10'
		},{
			t: '6', s: 'f10'
		},{
			t: '7', s: 'f10'
		},{
			t: '8', s: 'f10'
		},{
			t: '9', s: 'f10'
		}],
		failTransition: 'f0'
	},{
		name: 'f10',
		transitions: [{
			t: '0', s: 'f10'
		},{
			t: '1', s: 'f10'
		},{
			t: '2', s: 'f10'
		},{
			t: '3', s: 'f10'
		},{
			t: '4', s: 'f10'
		},{
			t: '5', s: 'f10'
		},{
			t: '6', s: 'f10'
		},{
			t: '7', s: 'f10'
		},{
			t: '8', s: 'f10'
		},{
			t: '9', s: 'f10'
		}],
		failTransition: 'f0'
	}];

var finalStates = ['f4', 'f7', 'f10'];

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
	console.log(term, currentState.name);
	for (var i = 0; i < currentState.transitions.length; i++) {
		if (currentState.transitions[i].t == term) {
			currentState = getStateByName(currentState.transitions[i].s);
			console.log(currentState.name);
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