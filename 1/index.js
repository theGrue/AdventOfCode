'use strict';

module.exports = function (input) {
	var basement = 0;
	var result = input.split('').reduce(function (floor, char, index) {
		if (char === '(') 
			floor++; 
		else 
			floor--;  
			
		if(floor < 0 && !basement) 
			basement = index + 1;
		
		return floor; 
	}, 0)
	
	console.log('To what floor do the instructions take Santa? ' + result);
	console.log('What is the position of the character that causes Santa to first enter the basement? ' + basement);
}
