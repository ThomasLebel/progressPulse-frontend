module.exports = {
  root: true,
  extends: ["expo", "eslint:recommended"],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    "no-undef": "error",
    "no-unused-vars": "warn",
  },
};
