/** @type {import("prettier").Config} */
module.exports = {
    printWidth: 80,
    arrowParens: "always",
    endOfLine: "lf",
    semi: false,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "all",
    pluginSearchDirs: false,
    importOrder: [
      "^react",
      "<TYPES>",
      "<TYPES>^[./]",
      "<THIRD_PARTY_MODULES>",
      "",
      "^@noodle/(.*)$",
      "",
      "^@/(.*)$",
      "^[./]",
    ],
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    importOrderTypeScriptVersion: "5.0.4",
  }