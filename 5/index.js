'use strict';

module.exports = function (input) {
	var nice = input.split('\n').reduce(function (total, str) {
		var vowels = str.split('').filter(function (char) {
			return ['a', 'e', 'i', 'o', 'u'].indexOf(char) >= 0;
		});
		
		var doubleLetter = (/([a-z])\1/i).test(str)
		
		var ab = str.indexOf('ab') >= 0 ? 1 : 0;
		var cd = str.indexOf('cd') >= 0 ? 1 : 0;
		var pq = str.indexOf('pq') >= 0 ? 1 : 0;
		var xy = str.indexOf('xy') >= 0 ? 1 : 0;
		
		var nice = (vowels.length >= 3) && doubleLetter && (ab+cd+pq+xy === 0);
		
		return total + (nice ? 1 : 0);
	}, 0);
	
	console.log('How many strings are nice? ' + nice);
	
	var nicer = input.split('\n').reduce(function (total, str) {
		var pairs = str.split('').reduce(function (pairs, char, index, array) {
			if (index < array.length - 1)
				pairs.push(char + array[index + 1]);
			return pairs;
		}, []);
		
		var doublePair = pairs.slice(0, pairs.length - 1).reduce(function (result, pair, index) {
			return result || pairs.lastIndexOf(pair) > index+1;
		}, false);
		
		var repeatPair = pairs.slice(0, pairs.length - 1).reduce(function (result, pair, index) {
			return result || pair === pairs[index + 1].split('').reverse().join('');
		}, false);
		
		return total + (doublePair && repeatPair ? 1 : 0);
	}, 0);
	
	console.log('How many strings are nice under these new rules? ' + nicer);
};
