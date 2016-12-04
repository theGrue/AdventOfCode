'use strict';

var _ = require('lodash');

module.exports = function (input) {
	var ingredients = input.split('\n').reduce(function (ingreds, ingred) {
		ingred = ingred.split(': ');
		ingreds[ingred[0]] = _.zipObject(ingred[1].split(', ').map(function (str) {
			return str.split(' ');
		}));
		return ingreds;
	}, {});
	
	var result = 0, cals = 0;
	for (var sp = 0; sp <= 100; sp++) {
		for (var pb = 0; pb <= 100; pb++) {
			for (var fr = 0; fr <= 100; fr++) {
				for (var su = 0; su <= 100; su++) {
					if (_.sum([sp, pb, fr, su]) === 100) {
						var capacity = Math.max(
							ingredients.Sprinkles.capacity * sp +
							ingredients.PeanutButter.capacity * pb +
							ingredients.Frosting.capacity * fr +
							ingredients.Sugar.capacity * su, 0);
							
						var durability = Math.max(
							ingredients.Sprinkles.durability * sp +
							ingredients.PeanutButter.durability * pb +
							ingredients.Frosting.durability * fr +
							ingredients.Sugar.durability * su, 0);
							
						var flavor = Math.max(
							ingredients.Sprinkles.flavor * sp +
							ingredients.PeanutButter.flavor * pb +
							ingredients.Frosting.flavor * fr +
							ingredients.Sugar.flavor * su, 0);
							
						var texture = Math.max(
							ingredients.Sprinkles.texture * sp +
							ingredients.PeanutButter.texture * pb +
							ingredients.Frosting.texture * fr +
							ingredients.Sugar.texture * su, 0);
						
						var calories = Math.max(
							ingredients.Sprinkles.calories * sp +
							ingredients.PeanutButter.calories * pb +
							ingredients.Frosting.calories * fr +
							ingredients.Sugar.calories * su, 0);
							
						result = Math.max(result, capacity*durability*flavor*texture);
						
						if (calories === 500) {
							cals = Math.max(cals, capacity*durability*flavor*texture)
						}
					}
				}
			}
		}
	}
	
	console.log('What is the total score of the highest-scoring cookie you can make? ' + result);
	console.log('Given the ingredients in your kitchen and their properties, what is the total score of the highest-scoring cookie you can make with a calorie total of 500? ' + cals);
}
