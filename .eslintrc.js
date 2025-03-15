module.exports = {
  extends: "next/core-web-vitals",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "off"
  }
} 