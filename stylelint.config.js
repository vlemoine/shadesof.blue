module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-prettier",
    "stylelint-config-html/vue",
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "alpha-value-notation": "number",
    "selector-class-pattern": null
  },
};
