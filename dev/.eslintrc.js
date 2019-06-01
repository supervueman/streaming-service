module.exports = {
  "extends": [
    "@vue/typescript",
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  rules: {
    "no-console": 0,
    "no-unused-vars": "warn",
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  "env": {
    "node": true,
    "commonjs": true
  },
  // "parser": "babel-eslint",
  // "extends": "standard",
  // "parser": "babel-eslint"
}
