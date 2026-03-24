/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "**/?(*.)+(spec|test).cjs",
  ],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
};
