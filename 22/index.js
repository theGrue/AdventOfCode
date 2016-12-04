'use strict';

var _ = require('lodash');

module.exports = function (input) {
    var boss = input.split('\n').reduce(function (boss, stat) {
        stat = stat.split(': ');
        boss[_.snakeCase(stat[0])] = parseInt(stat[1]);
        return boss;
    }, {});
    
    function spells (player, boss) {
        return [
            { name: 'Magic Missile', cost: 53, damage: 4 },
            { name: 'Drain', cost: 73, damage: 2, hit_points: 2 },
            { name: 'Shield', cost: 113, effect: { timer: 6, armor: 7 } },
            { name: 'Poison', cost: 173, effect: { timer: 6, damage: 3 } },
            { name: 'Recharge', cost: 229, effect: { timer: 5, mana: 101 } }
        ].filter(function (spell) {
            return !spell.effect || 
                !player.effects[_.snakeCase(name)] ||
                !boss.effects[_.snakeCase(name)];
        });
    };
    
    var games = [ { player: { hit_points: 50, mana: 500 }, boss: boss } ], turn = 1, min = Infinity;
    
    while (games.length) {
        var result = [];
        
        games.forEach(function (game) {
            if (turn % 2 === 1) {
                
            }
            else {
                
            }
        });
        
        games = result;
        turn++;
    }
    
    console.log(boss);
}
