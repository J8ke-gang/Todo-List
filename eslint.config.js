import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    env: {
      browser: true,
      es2021: true,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
