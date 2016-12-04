'use strict';

module.exports = function (input) {
    input = parseInt(input);
    
    function presents (house) {
        var result = 0;
        for (var i = 1; i <= house / 2; i++) {
            if (house % i === 0)
                result += i*10;
        }
        return result + house*10;
    }
    
    var house = presents(input);

    var lowest = Math.floor(input / 2);
    while (presents(lowest) < house) {
        lowest += 2;
    }
    
    console.log('What is the lowest house number of the house to get at least as many presents? ' + lowest);
}
