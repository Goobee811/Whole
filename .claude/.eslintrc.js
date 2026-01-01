/**
 * ESLint configuration for Whole project
 *
 * Enforces code quality and consistency across the codebase.
 */
module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
    'eqeqeq': 'error',
    'no-var': 'error',
    'no-console': 'off', // Allow console in CLI tools
    'semi': ['error', 'always'],
    'quotes': ['error', 'single', { avoidEscape: true }]
  }
};
