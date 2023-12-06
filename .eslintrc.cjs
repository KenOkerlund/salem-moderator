module.exports = {
  root: true,
  env: { browser: true, es2020: true },
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
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    indent: ['error', 'tab'],
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
  },
}
