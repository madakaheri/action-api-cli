import jsdocPlugin from 'eslint-plugin-jsdoc';

/** @type {import('xo').FlatXoConfig} */
const xoConfig = [
	jsdocPlugin.configs['flat/recommended'],
	{
		name: 'global-ignores',
		ignores: [
			'@types/**',
		],
	},
	{
		name: 'project-rules',
		rules: {
			'capitalized-comments': 'off',
			'jsdoc/require-param': 'error',
			'jsdoc/require-returns': 'error',
			'jsdoc/require-description': 'off',
			'jsdoc/require-param-description': 'off',
			'jsdoc/require-returns-description': 'off',
		},
	},
];

export default xoConfig;
