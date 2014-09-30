'use strict';

module.exports = {
	ext: 'number',
	system_name: 'yao_number',
	label: 'Number',
	validate: function(value) {
		if (isNaN(value)) {
			return false;
		} else {
			return true;
		}
	},
	convert: function(value) {
		return parseFloat(value);
	},
	defaultValue: function(value) {
		if (!value) {
			return 0;
		}

		return value;
	}
};