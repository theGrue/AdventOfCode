'use strict';

var _ = require('lodash');

module.exports = function (input) {
	function parse(instr) {
		instr = _.words(instr);
		if (instr.length === 7)
			instr.shift();
			
		return {
			op: instr[0],
			x1: parseInt(instr[1]), 
			y1: parseInt(instr[2]), 
			x2: parseInt(instr[4]), 
			y2: parseInt(instr[5])
		};
	}
	
	var result1 = input.split('\n').map(parse).reduce(function (grid, instr) {
		for (var i = instr.y1; i <= instr.y2; i++) {
			for (var j = instr.x1; j <= instr.x2; j++) {
				grid[i][j] = 
					instr.op === 'on' ? true : 
					instr.op === 'off' ? false : 
					!grid[i][j];
			}
		}
		
		return grid;
	}, _.range(1000).map(function () { return _.fill(Array(1000), false); }));
	
	var lit = _.flatten(result1).filter(_.identity).length;
	console.log('After following the instructions, how many lights are lit? ' + lit);
	
	var result2 = input.split('\n').map(parse).reduce(function (grid, instr) {
		for (var i = instr.y1; i <= instr.y2; i++) {
			for (var j = instr.x1; j <= instr.x2; j++) {
				grid[i][j] = 
					instr.op === 'on' ? grid[i][j] + 1 : 
					instr.op === 'off' ? Math.max(grid[i][j] - 1, 0) : 
					grid[i][j] + 2;
			}
		}
		
		return grid;
	}, _.range(1000).map(function () { return _.fill(Array(1000), 0); }));
	
	var brightness = _.sum(_.flatten(result2));
	console.log('What is the total brightness of all lights combined? ' + brightness);
}
