'use strict';

module.exports = {
	ext: 'boolean',
	system_name: 'yao_boolean',
	label: 'True/false',
	validate: function(value) {
		return (typeof value === 'boolean');
	},
	convert: function(value) {
		if (value === 'true') {
			return true;
		}
		if (value === 'false') {
			return false;
		}
		if (value === 'True') {
			return true;
		}
		if (value === 'False') {
			return false;
		}
		if (value === '1') {
			return true;
		}
		if (value === '0') {
			return false;
		}
		return !!value;
	},
	defaultValue: function(value) {
		if (value === undefined || value === null) {
			return false;
		}

		return value;
	}
};