module.exports = {
  env: {
    browser: false,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended'
  ],
  overrides: [{
    files: ["*.test.ts", "*.spec.ts"],
    rules: {
      "@typescript-eslint/no-unsafe-member-access": "off"
    }
  }],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  rules: {
  },
  ignorePatterns: [
    'node_modules',
    'dist/**/*',
    '*.js'
  ]
}
