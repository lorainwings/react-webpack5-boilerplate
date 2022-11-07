module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    quotes: 'off',
    '@typescript-eslint/quotes': 'off',
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'react/display-name': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
