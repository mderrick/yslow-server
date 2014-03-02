var phantomjs = require('phantomjs'),
	childProcess = require('child_process'),
	util = require('util'),
	args = process.argv.splice(2, process.argv.length);

args.unshift('lib/yslow.js')

var spawn = childProcess.spawn(phantomjs.path, args);

spawn.stdout.on('data', function(data) {
	util.print(data.toString());
});