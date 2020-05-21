const tsPreset = require("ts-jest/jest-preset");
const puppeteerPreset = require("jest-puppeteer/jest-preset");

module.exports = {
  ...tsPreset,
  ...puppeteerPreset,
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
};
