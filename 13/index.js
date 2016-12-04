'use strict';

var _ = require('lodash');
var permutator = require('../9/permutator');

module.exports = function (input) {
	function totalChangeInHappiness(units) {
		var permutations = permutator(_.keys(units));
	
		return permutations.reduce(function (happiest, path) {
			return Math.max(happiest, path.reduce(function (total, name, index) {
				var left = index === 0 ? (path.length - 1) : (index - 1);
				var right = index === (path.length - 1) ? 0 : (index + 1);
				return total + units[name][path[left]] + units[name][path[right]];
			}, 0));
		}, -Infinity);
	}
	
	var units = input.split('\n').map(_.words).reduce(function (units, edge) {
		_.set(units, edge[0] + '.' + edge[10], parseInt((edge[2] === 'lose' ? '-' : '') + edge[3]));
		return units;
	}, {});
	
	var happiest = totalChangeInHappiness(units);
	
	console.log('What is the total change in happiness for the optimal seating arrangement of the actual guest list? ' + happiest);
	
	_.keys(units).forEach(function (name) {
		_.set(units, 'yourself.' + name, 0);
		_.set(units, name + '.yourself', 0);
	});
	
	happiest = totalChangeInHappiness(units);
	
	console.log('What is the total change in happiness for the optimal seating arrangement that actually includes yourself? ' + happiest);
}
