module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    // we'll sometimes use an empty function to instantiate something that will later be given a function (such as default props/context)
    "@typescript-eslint/no-empty-function": "off",
    // we want to be able to assert non-null with a bang (!)
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "no-case-declarations": "off",
    "no-console": ["error", { allow: ["warn", "error", "info", "table"] }],
    "no-useless-escape": "off",
    // no biggy if a component doesn't have a display name. This is coming up in our mocks
    "react/display-name": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "no-nested-ternary": "error",
    "react-hooks/rules-of-hooks": "warn",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
