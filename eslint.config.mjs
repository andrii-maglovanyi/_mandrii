import pluginNext from "@next/eslint-plugin-next";
import pluginReadableTailwind from "eslint-plugin-readable-tailwind";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginSortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import pluginSortKeysFix from "eslint-plugin-sort-keys-fix";
import globals from "globals";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "plugin:typescript-sort-keys/recommended",
    ],
  }),
  {
    ignores: ["**/graphql.generated.ts"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "@next/next": pluginNext,
      "simple-import-sort": pluginSimpleImportSort,
      "sort-destructure-keys": pluginSortDestructureKeys,
      "sort-keys-fix": pluginSortKeysFix,
      "readable-tailwind": pluginReadableTailwind,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      ...pluginReadableTailwind.configs.warning.rules,
      ...pluginReadableTailwind.configs.error.rules,
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "sort-destructure-keys/sort-destructure-keys": [
        "error",
        { caseSensitive: false },
      ],
      "sort-keys-fix/sort-keys-fix": "error",
    },
  },
  ...tseslint.configs.recommended,
];

export default eslintConfig;
