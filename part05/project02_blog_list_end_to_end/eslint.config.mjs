import globals from "globals";

export default [
    {
        files: ["**/*.js"],
        languageOptions: {sourceType: "commonjs"},
        rules: {
            "indent": [
                "error",
                4  
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
        },
    },
{languageOptions: { globals: {...globals.browser, ...globals.node} }},
];