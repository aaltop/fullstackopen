const react = require("eslint-plugin-react")
const globals = require("globals")

module.exports = [
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
        plugins: {
            react,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node
            },
        },
        rules: {
            "indent": [
                "error",
                4,
                { "SwitchCase":1 }
            ],
            "quotes": [
                "warn",
                "double"
            ],
            "semi": [
                "error",
                "never"
            ],
            "camelcase": [
                "warn"
            ],
            "eqeqeq": "error",
            "no-trailing-spaces": [
                "warn",
                {
                    "ignoreComments": true
                },
            ],
            "object-curly-spacing": [
                "error", "always"
            ],
            "arrow-spacing": [
                "error", { "before": true, "after": true }
            ],
            "no-console": 0,
            "react/react-in-jsx-scope": "off",
            "react/prop-types": 0,
            "no-unused-vars": 0
        }
    },
]