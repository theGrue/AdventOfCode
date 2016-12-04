'use strict';

var argv = require('minimist')(process.argv.slice(2));
var day = Math.min(argv.d || argv.day || new Date().getDate(), 25);
var input = argv.i || argv.input || 'input';

if (input === 'input')
	input = require('fs').readFileSync([__dirname, day, input].join('/'), 'utf8');
	
require('./' + day)(input);