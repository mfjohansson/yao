'use strict';

var fs = require('fs');
var _ = require('lodash');

module.exports = function(colTypes, types, data) {
	var validationErrors = [];

	var newData = _.transform(data, function(result, value, fieldName) {
		var matchedType = _.find(colTypes, function(type) {
			return type.system_name === fieldName;
		});
		var matchedTypeBase;

		if (fieldName === 'testref') {
			debugger;
		}

		// If there are no matched type...
		if (!matchedType) {
			// ...check if the field is the ID...
			if (fieldName === '_id') {
				return true;
			// ...okay then, let's return null
			} else {
				validationErrors.push({field: fieldName, error: 'Field not specified in collection'});
				result[fieldName] = null;
				return;
			}
		}

		var i;
		for (i in types) {
			if (i === matchedType.type) {
				matchedTypeBase = types[i];
				break;
			}
		}
		if (!matchedTypeBase) {
			validationErrors.push({field: fieldName, error: 'Field type does not exist (critical)'});
			return null;
		}

		// Set default value (as specified per )
		if (matchedTypeBase.defaultValue) {
			value = matchedTypeBase.defaultValue(value);
		}

		// If it validates, return it
		if (matchedTypeBase.validate) {
			if (matchedTypeBase.validate(value)) {
				result[fieldName] = value;
				// By the way, no.
				//return true;
			}
		}

		// If not validation passes...
		// ...let's convert the value
		if (matchedTypeBase.convert) {
			value = matchedTypeBase.convert(value);
		}

		// Try to validate it again
		if (matchedTypeBase.validate) {
			if (matchedTypeBase.validate && matchedTypeBase.validate(value)) {
				result[fieldName] = value;
				return true;
			// Stupid value... doesn't validate...
			// Let's return null
			} else {
				validationErrors.push({field: fieldName, error: 'Field does not validate'});
				result[fieldName] = null;
				return;
			}
		} else {
			result[fieldName] = value;
			return true;
		}

	});

	return newData;
};