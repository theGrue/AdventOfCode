'use strict';

var _ = require('lodash');

module.exports = function (input) {
	var reindeer = input.split('\n').map(_.words).reduce(function (reindeer, spec) {
		reindeer[spec[0]] = {
			speed: parseInt(spec[3]),
			burst: parseInt(spec[7]),
			rest: parseInt(spec[14])
		}
		return reindeer;
	}, {});	
	
	var names = Object.keys(reindeer);
	
	function fly (reindeer, duration) {
		var distance = Math.floor(duration / (reindeer.burst + reindeer.rest));
		var remainder = duration % (reindeer.burst + reindeer.rest);
		return distance * reindeer.speed * reindeer.burst + 
			Math.min(remainder, reindeer.burst) * reindeer.speed;
	}
	
	var distance = names.reduce(function (distance, name) {
		return Math.max(distance, fly(reindeer[name], 2503));
	}, 0)
	
	console.log('What distance has the winning reindeer traveled? ' + distance);
	
	var points = _.zipObject(names, _.fill(Array(names.length), 0));
	for (var i = 1; i <= 2503; i++) {
		var distances = names.reduce(function (distances, name) {
			distances[name] = fly(reindeer[name], i);
			return distances;
		}, {});
		
		var highScore = _.max(_.values(distances));
		
		names.filter(function (name) {
			return distances[name] === highScore;
		}).forEach(function (name) {
			points[name]++;
		});
	}
		
	console.log('How many points does the winning reindeer have? ' + _.max(_.values(points)));
}
