// https://docs.expo.dev/guides/using-eslint/
import expoConfig from "eslint-config-expo/flat.js";
import { defineConfig } from "eslint/config";

const config = defineConfig([
  {
    ignores: ["dist/*"],
  },
  expoConfig,
]);

export default config;
