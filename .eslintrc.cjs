/* eslint-env node */
module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended"
  ],
  "rules": {
    "vue/no-v-html": "off"
  },
  "env": {
    "vue/setup-compiler-macros": true
  }
}
