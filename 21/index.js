'use strict';

var _ = require('lodash');
var combinations = require('../17/combinations');

module.exports = function (input) {
    var boss = input.split('\n').reduce(function (boss, stat) {
        stat = stat.split(': ');
        boss[_.snakeCase(stat[0])] = parseInt(stat[1]);
        return boss;
    }, {});

    var shop = {
        weapons: [
            { name: 'Dagger', cost: 8, damage: 4, armor: 0 },
            { name: 'Shortsword', cost: 10, damage: 5, armor: 0 },
            { name: 'Warhammer', cost: 25, damage: 6, armor: 0 },
            { name: 'Longsword', cost: 40, damage: 7, armor: 0 },
            { name: 'Greataxe', cost: 74, damage: 8, armor: 0 }
        ],
        armor: [
            { name: 'Leather', cost: 13, damage: 0, armor: 1 },
            { name: 'Chainmail', cost: 31, damage: 0, armor: 2 },
            { name: 'Splintmail', cost: 53, damage: 0, armor: 3 },
            { name: 'Bandedmail', cost: 75, damage: 0, armor: 4 },
            { name: 'Platemail', cost: 102, damage: 0, armor: 5 },
        ],
        rings: [
            { name: 'Damage +1', cost: 25, damage: 1, armor: 0 },
            { name: 'Damage +2', cost: 50, damage: 2, armor: 0 },
            { name: 'Damage +3', cost: 100, damage: 3, armor: 0 },
            { name: 'Defense +1', cost: 20, damage: 0, armor: 1 },
            { name: 'Defense +2', cost: 40, damage: 0, armor: 2 },
            { name: 'Defense +3', cost: 80, damage: 0, armor: 3 },
        ]
    };

    function fight (player, boss) {
        var php = player.hit_points, bhp = boss.hit_points, turn = 1;
        while (php > 0 && bhp > 0) {
            if (turn % 2 === 1)
                bhp -= Math.max(player.damage - boss.armor, 0);
            else
                php -= Math.max(boss.damage - player.armor, 0);

            turn++;
        }

        return php > bhp;
    }

    var min = Infinity, max = -Infinity;
    
    var rings = combinations(_.range(shop.rings.length)).filter(function (combo) { return combo.length <= 2; });
    rings.push([]);
    
    shop.weapons.forEach(function (weapon) {
        shop.armor.concat([ { cost: 0, damage: 0, armor: 0 } ]).forEach(function (armor) {
            rings.forEach(function (rings) {
                var player = {
                    hit_points: 100,
                    damage: weapon.damage,
                    armor: armor.armor,
                    cost: weapon.cost + armor.cost
                };
                
                rings.forEach(function (index) {
                    var ring = shop.rings[index];
                    player.damage += ring.damage;
                    player.armor += ring.armor;
                    player.cost += ring.cost;
                });
                
                if (player.cost < min || player.cost > max) {
                    if (fight(player, boss)) {
                        min = Math.min(min, player.cost);
                    }
                    else {
                        max = Math.max(max, player.cost);
                    }
                }
            })
        })
    })

    console.log('What is the least amount of gold you can spend and still win the fight? ' + min);
    console.log('What is the most amount of gold you can spend and still lose the fight? ' + max);
}
