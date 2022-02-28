module.exports = {
  bracketSpacing: false,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: [true, {
    'singleline': 'never',
    'multiline': {
      'objects': 'always',
      'arrays': 'always',
      'functions': 'never',
      'typeLiterals': 'ignore'
    }
  }],
  arrowParens: 'avoid',
}