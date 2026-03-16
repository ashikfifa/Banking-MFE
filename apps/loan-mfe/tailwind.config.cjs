const preset = require("../../tailwind.preset.cjs");

module.exports = {
  presets: [preset],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "../../packages/ui-library/src/**/*.{js,jsx}"
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {}
  },
  plugins: []
};
