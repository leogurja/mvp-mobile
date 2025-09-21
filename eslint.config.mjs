import config from "@gurja/eslint-config";
import next from "@gurja/eslint-config/next";

export default config(next, {
  rules: {
    "react-refresh/only-export-components": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
  },
});
