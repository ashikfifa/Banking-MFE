const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        background: colors.gray,
        success: colors.green,
        danger: colors.red
      },
      boxShadow: {
        float: "0 22px 60px -24px rgba(37, 99, 235, 0.35)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(147, 197, 253, 0.35), transparent 42%), radial-gradient(circle at top right, rgba(191, 219, 254, 0.5), transparent 32%)"
      }
    }
  }
};
