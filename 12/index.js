'use strict';

var _ = require('lodash');

module.exports = function (input) {
	input = JSON.parse(input);
	
	var values = _.flatten(_.values(input));
	while (!_.all(values, _.isNumber)) {
		values = _.flatten(_.compact(values.map(function (val) {
			if (_.isNumber(val))
				return val;
			else if (_.isObject(val))
				return _.values(val);
		})));
	}
	
	var result = _.sum(values);
	
	console.log('What is the sum of all numbers in the document? ' + result);
		
	var values2 = [ input ];
	while (!_.all(values2, _.isNumber)) {
		values2 = _.flatten(_.compact(values2.map(function (val) {
			if (_.isNumber(val) || _.isArray(val))
				return val;
			else if (_.isObject(val)) {
				var vals = _.values(val);
				if (!_.contains(vals, 'red'))
					return vals;
			}
		})));
	}
	
	var result2 = _.sum(values2);
	
	console.log('Ignore any object which has any property with the value "red". ' + result2);
}
