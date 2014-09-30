'use strict';

var moment = require('moment');

module.exports = {
	ext: 'datetime',
	system_name: 'yao_datetime',
	label: 'Date & time',
	validate: function(value) {
		return moment(new Date(value)).isValid();
	},
	convert: function(value) {
		return moment(new Date(value)).toDate();
	},
	defaultValue: function(value) {
		if (!moment(new Date(value)).isValid()) {
			return moment().toDate();
		}

		return value;
	}
};