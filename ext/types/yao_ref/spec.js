'use strict';

var ObjectID = require('mongodb').ObjectID;

module.exports = {
	ext: 'string',
	system_name: 'yao_ref',
	label: 'Reference',
	validate: function(value) {
		if (!value) {
			return false;
		}
		value = value.toString();
		if (value.length !== 24) {
			return false;
		}

		try {
			return !!(new ObjectID(value));
		} catch (e) {
			return false;
		}
	},
	convert: function(value) {
		try {
			var id = new ObjectID(value);
			return id;
		} catch (error) {
			return null;
		}
	},
	defaultValue: function(value) {
		if (!value) {
			return null;
		}

		return value;
	}
};