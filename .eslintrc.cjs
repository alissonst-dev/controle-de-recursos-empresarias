module.exports = {
  env: {
    browser: true,
    node: true,
    es2022: true,
  },

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "script",
  },

  ignorePatterns: [
    "node_modules/",
    "server/node_modules/",
    "frontend/styles/",
  ],

  rules: {
    "no-unused-vars": "warn",
    "no-undef": "error",
    "semi": ["error", "always"],
  },
};
