'use strict';

module.exports = {
	ext: 'string',
	system_name: 'yao_string',
	label: 'Text',
	validate: function(value) {
		if (typeof value === 'string') {
			return true;
		} else {
			return false;
		}
	},
	convert: function(value) {
		return value + '';
	},
	defaultValue: function(value) {
		if (!value) {
			return '';
		}

		return value;
	}
};