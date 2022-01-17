/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function"
      }
    ],
    "no-underscore-dangle": "off",
    "no-plusplus": "off"
  },
  settings: {
    react: {
      version: "17"
    }
  }
};
