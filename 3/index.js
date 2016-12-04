'use strict';

module.exports = function (input) {
	function nextPos (pos, move) {
		var xy = pos.split(',');
		var x = parseInt(xy[0]), y = parseInt(xy[1]);
		
		if (move === '^') y++;
		if (move === 'v') y--;
		if (move === '>') x++;
		if (move === '<') x--;
		
		return [x,y].join();
	}
	
	var pos = '0,0';
	var santa = input.split('').reduce(function (coords, move) {
		pos = nextPos(pos, move);
		if (coords.indexOf(pos) < 0) 
			coords.push(pos);
		return coords;
	}, [ pos ]);
	
	console.log('How many houses receive at least one present? ' + santa.length);
	
	var santaPos = '0,0', roboPos = '0,0';
	var roboSanta = input.split('').reduce(function (coords, move, index) {
		if (index % 2 === 0) {
			santaPos = nextPos(santaPos, move);
			if (coords.indexOf(santaPos) < 0) 
				coords.push(santaPos);
		}
		else {
			roboPos = nextPos(roboPos, move);
			if (coords.indexOf(roboPos) < 0) 
				coords.push(roboPos);
		}
		
		return coords;
	}, [ santaPos ]);
	
	console.log('This year, how many houses receive at least one present? ' + roboSanta.length);
}
