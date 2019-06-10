module.exports = {
  "extends": [
    // "@vue/typescript",
    // "plugin:vue/essential",
    // "@vue/eslint-config-typescript"
    // "eslint:recommended",
    // "@vue/prettier",
    // "plugin:prettier/recommended",
    // "plugin:@typescript-eslint/recommended",

    "eslint:recommended",
    // "plugin:@typescript-eslint/eslint-recommended",
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
  "globals": {
    "localStorage": true,
  }
  // "parser": "babel-eslint",
  // "extends": "standard",
  // "parser": "babel-eslint"
}
