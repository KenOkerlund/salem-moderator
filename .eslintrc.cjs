module.exports = {
	root: true,
	env: {
		browser: true,
		es2020: true,
		"vitest-globals/env": true
	},
	settings: {
		react: {
			version: "detect"
		}
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		"plugin:vitest-globals/recommended",
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'vitest'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		'linebreak-style': 2,
		semi: ['error', 'always'],
		"comma-dangle": [
			'error',
			{
				arrays: "always-multiline",
				objects: "always-multiline",
				imports: "always-multiline",
				exports: "always-multiline",
				functions: "always-multiline"
			}
		],
		"eol-last": ["error", "always"],
		"object-curly-spacing": ["error", "always"],
		"array-bracket-spacing": ["error", "never"],
		"comma-spacing": ["error", { "after": true, "before": false }],
		"no-unneeded-ternary": "error",
	},
}
