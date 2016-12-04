'use strict';

var _ = require('lodash');
var permutator = require('./permutator');

module.exports = function (input) {	
	var distances = input.split('\n').reduce(function (distances, edge) {
		edge = edge.split(' ');
		_.set(distances, edge[0] + '.' + edge[2], parseInt(edge[4]));
		_.set(distances, edge[2] + '.' + edge[0], parseInt(edge[4]));
		return distances;
	}, {});
	
	var permutations = permutator(_.keys(distances));
	
	var shortest = permutations.reduce(function (shortest, path) {
		return Math.min(shortest, path.slice(1).reduce(function (total, city, index) {
			return total + distances[path[index]][city];
		}, 0));
	}, Infinity);
	
	console.log('What is the distance of the shortest route? ' + shortest);
	
	var longest = permutations.reduce(function (longest, path) {
		return Math.max(longest, path.slice(1).reduce(function (total, city, index) {
			return total + distances[path[index]][city];
		}, 0));
	}, 0);
	
	console.log('What is the distance of the longest route? ' + longest);
}
