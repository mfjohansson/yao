'use strict';

module.exports = {
	ext: 'number',
	system_name: 'yao_list',
	label: 'List',
	validate: function(value) {
		return (value instanceof Array);
	},
	convert: function(value) {
		var na = [];
		var i;
		for (i in value) {
			na.push(value + '');
		}
		return na;
	},
	defaultValue: function(value) {
		if (!value) {
			return [];
		}

		return value;
	}
};