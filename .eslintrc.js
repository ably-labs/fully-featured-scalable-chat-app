/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [],
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
    "react/display-name": [0],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function"
      }
    ],
    "react/prop-types": [0],
    "arrow-body-style": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": "off"
  },
  settings: {
    react: {
      version: "17"
    }
  }
};
