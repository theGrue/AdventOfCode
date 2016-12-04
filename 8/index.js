'use strict';

module.exports = function (input) {
	var result1 = input.split('\n').reduce(function (total, str) {
		var memory;
		eval('memory = ' + str);
		return total + str.length - memory.length;
	}, 0);
	
	console.log('Disregarding the whitespace in the file, what is the number of characters of code for string literals minus the number of characters in memory for the values of the strings in total for the entire file? ' + result1);
	
	var result2 = input.split('\n').reduce(function (total, str) {
		var encoded = JSON.stringify(str);
		return total + encoded.length - str.length;
	}, 0);
	
	console.log('What is the total number of characters to represent the newly encoded strings minus the number of characters of code in each original string literal? ' + result2);
}
