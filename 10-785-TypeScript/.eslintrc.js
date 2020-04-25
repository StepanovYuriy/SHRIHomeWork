module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb',
        'plugin:react/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
    ],
    rules: {
        /**
         * Настройки отступов (4 пробела)
         * https://eslint.org/docs/rules/indent
         */
        'indent': ['error', 4, {
            SwitchCase: 1,
            /**
             * Отключение проверок для JSX разметки
             * https://github.com/benjamn/ast-types/blob/master/def/jsx.ts
             */
            ignoredNodes: [
                'JSXElement',
                'JSXElement > *',
            ],
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
         * Настройки отступов в JSX разметке (4 пробела)
         * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
         */
        'react/jsx-indent': ['error', 4],

        /**
         * Выравнивание отступов по первому props
         * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
         */
        'react/jsx-indent-props': ['error', 'first'],

        /**
         * Запрещено перемещать первое свойство в новую строку
         * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
         */
        'react/jsx-first-prop-new-line': ['error', 'never'],

        /**
         * Так и не разобрался, для чего это правило. Отключено
         * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
         */
        'jsx-a11y/anchor-is-valid': 'off',

        /**
         * Так и не разобрался, для чего это правило. Отключено
         * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
         */
        'jsx-a11y/label-has-associated-control': 'off',
    },
};
