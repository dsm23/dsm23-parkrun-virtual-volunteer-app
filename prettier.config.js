/**
 *  @type {import("prettier").Options}
 */
const config = {
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",
    "<TYPES>^(react)",
    "^clsx$",
    "<TYPES>^(clsx)",
    "^@*expo",
    "<TYPES>^(@*expo)",
    "<BUILTIN_MODULES>",
    "<TYPES>^(node:)",
    "<THIRD_PARTY_MODULES>",
    "<TYPES>^([@a-z])",
    "^~/(.*)$",
    "<TYPES>^~/(.*)",
    "^[.]",
    "<TYPES>",
    "",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
  // renovate: datasource=npm depName=typescript
  importOrderTypeScriptVersion: "5.8.3",
};

export default config;
