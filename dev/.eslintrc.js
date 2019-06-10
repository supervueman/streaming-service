module.exports = {
  "extends": [
    "eslint:recommended",
    "@vue/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "no-console": 0,
    "no-unused-vars": "warn",
    "indent": "off",
    "@typescript-eslint/indent": ["error", "tab"],
    "@typescript-eslint/no-explicit-any": "off",
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  "env": {
    "node": true,
    "commonjs": true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    "ecmaVersion": 6,
  },
  "globals": {
    "localStorage": true,
  }
  // "parser": "babel-eslint",
  // "extends": "standard",
  // "parser": "babel-eslint"
}
