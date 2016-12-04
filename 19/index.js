'use strict';

var _ = require('lodash');

module.exports = function (input) {
	var molecule;
    var replacements = input.split('\n').reduce(function (rs, r, index, array) {
        if (index === array.length - 1) {
            molecule = r.split(/(?=[A-Z])/);
        }
        else if (r) {
            r = r.split(' => ');
            rs[r[0]] = rs[r[0]] ? [].concat(rs[r[0]], [r[1]]) : [r[1]];
        }
        return rs;
    }, {});
    
    function replace(molecule) {
        var indices = molecule.reduce(function (indices, element, index) {
            if (replacements[element])
                indices.push(index);
            return indices;
        }, []);
        
        return _(indices).map(function (index) {
            var repls = replacements[molecule[index]];
            return repls.map(function (repl) {
            var mol = _.clone(molecule);
            mol[index] = repl;
            return mol.join(''); 
            });
        }).flatten().uniq().value();
    }
    
    var result = replace(molecule);
    
    console.log('How many distinct molecules can be created after all the different ways you can do one replacement on the medicine molecule? ' + result.length);
    
    molecule = molecule.join('');
    
    var results = [ 'e' ], counter = 0;
    while (!_.contains(results, molecule)) {
        var res = [];
        results.forEach(function (mol) {
            res = res.concat(replace(mol.split(/(?=[A-Z])/)));
        });
        results = _.uniq(res);
        console.log(counter + ' - ' + results.length);
        counter++;
    }
    
    console.log('What is the fewest number of steps to go from e to the medicine molecule? ' + counter);
}
