module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['@typescript-eslint', 'sort-exports'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // requires consistent spacing around type annotations.
    '@typescript-eslint/type-annotation-spacing': 'error',
    // disallow spaces between curly braces
    'array-bracket-spacing': ['error', 'never'],
    // allows omitting parens when there is only one argument
    'arrow-parens': ['error', 'as-needed'],
    // requires space before/after arrow function's arrow.
    'arrow-spacing': 'error',
    // enforces the spaces inside of blocks after opening blocks and before closing blocks.
    'block-spacing': 'error',
    // put brace after statement with 1 space and allow one inline statement
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    // looks for any underscores (_) located within the source code.
    camelcase: 0,
    // disallow trailing commas
    'comma-dangle': ['error', 'never'],
    // enforces spacing around commas.
    'comma-spacing': ['error', { after: true, before: false }],
    // enforce consistent comma style in <template>
    'comma-style': ['error', 'last'],
    // Enforces newline before dots.
    'dot-location': ['error', 'property'],
    // enforces dot notation whenever possible.
    'dot-notation': 'error',
    // required to use type comparison === or !==
    eqeqeq: ['error', 'always'], // ?
    // required 2 indented spaces
    indent: ['error', 2, { SwitchCase: 1 }], // ?
    // enforce consistent spacing after keywords
    'keyword-spacing': ['error', { after: true, before: true }],
    // require an empty line after variable declarations
    'newline-after-var': 'error',
    // isn't allowed to use async Promises
    'no-async-promise-executor': 'error', // ?
    // allow only console.error or console.warn
    'no-console': ['error', { allow: ['warn', 'error']}],
    // allow debugger during development
    'no-debugger': 'error',
    // amount of empty lines has been exceeded
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    // required not to have trailing spaces
    'no-trailing-spaces': 'error',
    // disallow ternary operators when simpler alternatives exist
    'no-unneeded-ternary': 'error',
    // require `let` or `const` instead of `var`
    'no-var': 'error',
    // allow spaces between curly braces
    'object-curly-spacing': ['error', 'always'],
    // require object literal shorthand syntax
    'object-shorthand': 'error',
    // Suggest using const
    'prefer-const': 'error',
    // requires destructuring from arrays and/or objects
    'prefer-destructuring': 'error',
    // Suggest using template literals instead of string concatenation
    'prefer-template': 'error',
    // require quotes around object literal property names
    'quote-props': ['error', 'as-needed'],
    // enforce the consistent use of either backticks, double, or single quotes
    quotes: ['error', 'single'],
    // disallow semicolons
    semi: ['error', 'never'], // ?
    // sorted list of export declarations
    'sort-exports/sort-exports': 'error',
    // sorted list of import declarations
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple']
      }
    ],
    // disallow Space Before Blocks
    'space-before-blocks': 'error',
    // requires or disallows a space before function parenthesis.
    'space-before-function-paren': 'error'
  },
  overrides: [
    {
      files: ["tests/**/*.spec.ts"],
      rules: {
        "@typescript-eslint/no-empty-function": 'off'
      }
    }
  ]
}

