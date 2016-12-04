'use strict';

var _ = require('lodash');

module.exports = function (input) {
	function val (wires, op) {
		if (_.isNumber(op)) {
			return op;
		}
		else if (!_.isArray(wires[op])) {
			return wires[op];
		}
	}
	
	function res (wires, wire) {
		while (!_.isNumber(wires[wire])) {
			_.forEach(wires, function (instr, wire) {
				var result;
				
				if (instr.length === 1) {
					result = val(wires, instr[0]);
				}
				else if (instr.length === 2) {
					if (!_.isUndefined(val(wires, instr[1]))) {
						result = 65535 - val(wires, instr[1]);
					}
				}
				else if (instr.length === 3) {
					var lhs = val(wires, instr[0]);
					var rhs = val(wires, instr[2]);
					if (!_.isUndefined(lhs) && !_.isUndefined(rhs)) {
						if (instr[1] === 'AND') {
							result = lhs & rhs;
						}
						else if (instr[1] === 'OR') {
							result = lhs | rhs;
						}
						else if (instr[1] === 'LSHIFT') {
							result = lhs << rhs;
						}
						else if (instr[1] === 'RSHIFT') {
							result = lhs >> rhs;
						}
					}
				}
				
				if (!_.isUndefined(result)) {
					wires[wire] = result;
				}
			});
		}
		
		return wires[wire];
	}
	
	var wires = input.split('\n').reduce(function (wires, instr) {
		instr = instr.split(' ');
		var res = instr.pop();
		instr.pop();
		wires[res] = instr.map(function (wire) {
			var num = parseInt(wire);
			return num.toString() !== wire ? wire : num;
		});
		return wires;
	}, {});
	
	var a = res(_.clone(wires), 'a');

	console.log('What signal is ultimately provided to wire a? ' + a);
	
	wires.b = a;
	a = res(wires, 'a');
	
	console.log('What new signal is ultimately provided to wire a? ' + a);
}
