'use strict';

module.exports = {
	ext: 'boolean',
	system_name: 'yao_boolean',
	label: 'True/false',
	array: {
		mustBe: false,
		canBe: false
	},
	validation: {
		required: true,
		minLength: true,
		maxLength: true
	}
};