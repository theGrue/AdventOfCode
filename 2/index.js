'use strict';

module.exports = function (input) {
	var paper = input.split('\n').reduce(function (total, dimensions) {
		var dim = dimensions.split('x');
		var l = parseInt(dim[0]), w = parseInt(dim[1]), h = parseInt(dim[2]);
		var slack = Math.min(l*w, w*h, h*l);
		return total + 2*l*w + 2*w*h + 2*h*l + slack;
	}, 0);
	
	console.log('How many total square feet of wrapping paper should they order? ' + paper);
	
	var ribbon = input.split('\n').reduce(function (total, dimensions) {
		var dim = dimensions.split('x');
		var l = parseInt(dim[0]), w = parseInt(dim[1]), h = parseInt(dim[2]);
		var wrap = Math.min(2*l+2*w, 2*w+2*h, 2*h+2*l);
		return total + wrap + l*w*h;
	}, 0);
	
	console.log('How many total feet of ribbon should they order? ' + ribbon);
}
