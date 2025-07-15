// https://jestjs.io/docs/configuration

/**
 * @type {import("jest").Config}
 */
const config = {
  preset: "jest-expo",
  testPathIgnorePatterns: ["<rootDir>/playwright-tests/"],
  transformIgnorePatterns: [
    "node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg))",
  ],
};

export default config;
