import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier/recommended";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";

export default [
  js.configs.recommended,
  ...tsPlugin.configs["flat/recommended"],
  {
    files: ["src/**/*.ts", "__test__/**/*.ts"],
    languageOptions: { globals: globals.node },
  },
  {
    ...jestPlugin.configs["flat/recommended"],
    files: ["__test__/**/*.ts"],
  },
  prettier,
];
