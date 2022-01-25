/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { jsWithTsESM: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironment: "jsdom",
  verbose: false,
  testPathIgnorePatterns: [
    "/node_modules",
    "/dist",
    "/api"
  ],
  extensionsToTreatAsEsm: [
    ".ts", ".jsx", ".tsx"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  transform: {
    ...tsjPreset.transform
  }
};