'use strict';

var _ = require('lodash');

module.exports = function (input) {
    function print(grid) {
        grid.forEach(function (row) {
            console.log(row.map(function (light) {
                return light ? '#' : '.';
            }).join(''));
        })
    }
    
    function animate(grid, isStuck) {
        return grid.map(function (row, y) {
            return row.map(function (light, x) {
                var neighbors = _.compact([
                    _.get(grid, '[' + (y-1) + '][' + (x-1) + ']'),
                    _.get(grid, '[' + (y-1) + '][' +  x    + ']'),
                    _.get(grid, '[' + (y-1) + '][' + (x+1) + ']'),
                    _.get(grid, '[' +  y    + '][' + (x-1) + ']'),
                    _.get(grid, '[' +  y    + '][' + (x+1) + ']'),
                    _.get(grid, '[' + (y+1) + '][' + (x-1) + ']'),
                    _.get(grid, '[' + (y+1) + '][' +  x    + ']'),
                    _.get(grid, '[' + (y+1) + '][' + (x+1) + ']'),
                ]);
                
                if (isStuck && (
                    (x === 0 && y === 0) ||
                    (x === 0 && y === grid.length-1) ||
                    (x === row.length-1 && y === 0) ||
                    (x === row.length-1 && y === grid.length-1))) {
                    return true;
                }
                else if (light) {
                    return neighbors.length === 2 || neighbors.length === 3;
                }
                else {
                    return neighbors.length === 3;
                }
            })
        });
    }
    
	var grid = input.split('\n').map(function (row, index) {
        return row.split('').map(function (light) {
            return light === '#';
        });
    });
    
    var result1 = _.clone(grid, true);
    for (var i = 0; i < 100; i++) {
        result1 = animate(result1);
    }
    
    var lit1 = _.flatten(result1).filter(_.identity).length;
	console.log('How many lights are on after 100 steps? ' + lit1);
    
    var result2 = _.clone(grid, true);
    result2[0][0] = true;
    result2[0][grid[0].length - 1] = true;
    result2[grid.length - 1][0] = true;
    result2[grid.length - 1][grid[0].length - 1] = true;
    
    for (var i = 0; i < 100; i++) {
        result2 = animate(result2, true);
    }
    
    var lit2 = _.flatten(result2).filter(_.identity).length;
	console.log('With the four corners always in the on state, how many lights are on after 100 steps? ' + lit2);
}
