'use strict';

var _ = require('lodash');
var combinations = require('./combinations');

module.exports = function (input) {
	var containers = input.split('\n').map(Number);
	
	var combos = combinations(containers).filter(function (combo) {
		return _.sum(combo) === 150;
	});
	
	console.log('Filling all containers entirely, how many different combinations of containers can exactly fit all 150 liters of eggnog? ' + combos.length);	
	
	var minLength = _.min(combos.map(function (combo) { return combo.length; }));
	var minCombos = combos.filter(function (combo) { return combo.length === minLength; })
	
	console.log('How many different ways can you fill that number of containers and still hold exactly 150 litres? ' + minCombos.length);
}
