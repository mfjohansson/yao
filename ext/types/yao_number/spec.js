'use strict';

module.exports = {
	ext: 'number',
	system_name: 'yao_number',
	label: 'Number',
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