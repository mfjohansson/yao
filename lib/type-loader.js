'use strict';

var fs = require('fs');
var _ = require('lodash');

module.exports = {
	types: [],
	load: function() {
		var files = fs.readdirSync(__dirname + '/../ext/types');
		_.each(files, function(file) {
			module.exports.types[file] = require('../ext/types/' + file + '/spec.js');
		});
	}
};

module.exports.load();