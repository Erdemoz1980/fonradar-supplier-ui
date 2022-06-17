module.exports = {
    extends: ['wesbos'],

    rules: {
        'react/jsx-props-no-spreading': 0,
        'react/display-name': 0,
        'react/prop-types': 0,
        'no-unused-expressions': 0,
        'react/destructuring-assignment': 0,
        'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
        'no-console': 1,
        'prettier/prettier': [
            2,
            {
                trailingComma: 'es5',
                singleQuote: true,
                printWidth: 110,
                tabWidth: 4,
                jsxBracketSameLine: true,
            },
        ],
    },
};
