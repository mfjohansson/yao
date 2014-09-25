'use strict';

module.exports = {
	ext: 'number',
	system_name: 'yao_list',
	label: 'List',
	array: {
		mustBe: true,
		canBe: true
	},
	validation: {
		required: true,
		minLength: false,
		maxLength: false,
		minCount: true,
		maxCount: true
	}
};