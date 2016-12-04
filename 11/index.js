'use strict';

var _ = require('lodash');

module.exports = function (input) {
	function linum2int(input) {
		input = input.replace(/[^A-Za-z]/, '');
		var output = 0;
		for (var i = 0; i < input.length; i++) {
			output = output * 26 + parseInt(input.substr(i, 1), 26 + 10) - 9;
		}

		return output;
	}
	
	function int2linum(input) {
		var zeros = 0;
		var next = input;
		var generation = 0;
		while (next >= 27) {
			next = (next - 1) / 26 - (next - 1) % 26 / 26;
			zeros += next * Math.pow(27, generation);
			generation++;
		}
		var output = (input + zeros).toString(27).replace(/./g, function ($0) {
			return '_abcdefghijklmnopqrstuvwxyz'.charAt(parseInt($0, 27));
		});
		return output;
	}
	
	function next(input) {
		return int2linum(linum2int(input) + 1);
	}
	
	var straights = _.range(24).map(function (n) {
		return String.fromCharCode('a'.charCodeAt(0) + n) +
			String.fromCharCode('b'.charCodeAt(0) + n) +
			String.fromCharCode('c'.charCodeAt(0) + n);
	});
	
	function valid(input) {
		var pairs = input.split('').reduce(function (pairs, char, index, array) {
			if (index < array.length - 1)
				pairs.push(char + array[index + 1]);
			return pairs;
		}, []);
		pairs = _.uniq(pairs);
		
		var triples = input.split('').reduce(function (pairs, char, index, array) {
			if (index < array.length - 2)
				pairs.push(char + array[index + 1] + array[index + 2]);
			return pairs;
		}, []);
		
		var first = _.any(straights, function (straight) {
			return _.contains(triples, straight);
		});
		
		var second =
			input.indexOf('i') < 0 &&
			input.indexOf('o') < 0 &&
			input.indexOf('l') < 0;
		
		var isDouble = function (pair) {
			return pair === pair.split('').reverse().join('');
		};
		var firstDouble = _.findIndex(pairs, isDouble);
		var lastDouble = _.findLastIndex(pairs, isDouble);
		
		var third = firstDouble >= 0 && lastDouble >= 0 && firstDouble < lastDouble - 1;
		
		return first && second && third;
	}

	var result = next(input);
	while (!valid(result)) {
		result = next(result);
	}
	
	console.log('What should his next password be? ' + result);
	
	result = next(result);
	while (!valid(result)) {
		result = next(result);
	}
	
	console.log('Santa\'s password expired again. What\'s the next one? ' + result);
}
