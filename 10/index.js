'use strict';

module.exports = function (input) {
	function lookAndSay (input) {
		var steps = input.split('').reduce(function (steps, char) {
			if (steps.length && steps[steps.length - 1][0] === char)
				steps[steps.length - 1] = steps[steps.length - 1] + char;
			else
				steps.push(char);
			
			return steps;
		}, []);

		return steps.map(function (step) {
			return step.length.toString() + step[0];
		}).join('');
	}
	
	var result = input.toString();
	for (var i = 0; i < 40; i++) {
		result = lookAndSay(result);
	}

	console.log('What is the length of the result? ' + result.length);
	
	for (var i = 0; i < 10; i++) {
		result = lookAndSay(result);
	}

	console.log('What is the length of the new result? ' + result.length);
}
