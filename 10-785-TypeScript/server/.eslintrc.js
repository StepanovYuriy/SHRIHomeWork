module.exports = {
    root: true,
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        /**
         * Настройки отступов (4 пробела)
         * https://eslint.org/docs/rules/indent
         */
        'indent': ['error', 4, {
            SwitchCase: 1,
        }],

        /**
         * Разрешены любые переносы строк (CRLF, LF)
         * https://eslint.org/docs/rules/linebreak-style
         */
        'linebreak-style': 'off',

        /**
         * Максимальная длина строки (120 символов)
         * https://eslint.org/docs/rules/max-len
         */
        'max-len': ['error', {
            code: 120,
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],

        /**
         * Запрещено использование console.log()
         * https://eslint.org/docs/rules/no-console
         */
        'no-console': ['error', {
            allow: ['info', 'warn', 'error'],
        }],

        /**
         * Настройки для согласованных разрывов строк
         * https://eslint.org/docs/rules/object-curly-newline
         */
        'object-curly-newline': ['error', {
            ObjectExpression: { multiline: true, consistent: true },
            ObjectPattern: { multiline: true, consistent: true },
            ImportDeclaration: { multiline: true, consistent: true },
            ExportDeclaration: { multiline: true, consistent: true },
        }],

        /**
         * Разрешено использование второго параметра для parseInt() при необходимости
         * https://eslint.org/docs/rules/radix
         */
        'radix': ['error', 'as-needed'],

        /**
         * Временно отключено
         * https://eslint.org/docs/rules/prefer-promise-reject-errors
         */
        'prefer-promise-reject-errors': 'off',
    },
};
