'use strict';

var md5 = require('md5');

module.exports = function (input) {
	var result = '', i = 0;
	while (result.substr(0, 5) !== '00000') {
		result = md5(input + i++);
	}
	
	console.log('The lowest positive number that produces such a hash. ' + (i - 1));
	
	i = 0;
	while (result.substr(0, 6) !== '000000') {
		result = md5(input + i++);
	}
	
	console.log('Now find one that starts with six zeroes. ' + (i - 1));
}