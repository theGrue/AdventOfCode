'use strict';

var _ = require('lodash');

module.exports = function (input) {
	var sues = input.split('\n').map(_.words).map(function (words) {
		var result = {};
		result[words[2]] = parseInt(words[3]);
		result[words[4]] = parseInt(words[5]);
		result[words[6]] = parseInt(words[7]);
		return result;
	});
	
	var mfcsam = {
		children: 3,
		cats: 7,
		samoyeds: 2,
		pomeranians: 3,
		akitas: 0,
		vizslas: 0,
		goldfish: 5,
		trees: 3,
		cars: 2,
		perfumes: 1
	};
	
	sues.forEach(function (sue, index) {
		if (_.eq(sue, _.pick(mfcsam, _.keys(sue))))
			console.log('What is the number of the Sue that got you the gift? ' + (index+1));
	});
	
	sues.forEach(function (sue, index) {
		var result = [false, false, false];
		_.keys(sue).forEach(function (key, index) {
			if (key === 'cats' || key === 'trees') {
				result[index] = sue[key] > mfcsam[key];
			}
			else if (key === 'pomeranians' || key === 'goldfish') {
				result[index] = sue[key] < mfcsam[key];
			}
			else {
				result[index] = sue[key] === mfcsam[key];
			}
		});
		
		if (result[0] && result[1] && result[2])
			console.log('What is the number of the real Aunt Sue? ' + (index+1));
	});
}
