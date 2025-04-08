import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import storybook from "eslint-plugin-storybook";

export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.{ts,tsx}"],
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat["jsx-runtime"],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "error",
      "react-hooks/exhaustive-deps": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  eslintConfigPrettier,
];
