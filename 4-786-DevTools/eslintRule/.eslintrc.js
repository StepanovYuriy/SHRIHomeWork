module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
    },
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
    },
    'plugins': [
        'lodash-to-native',
    ],
    'rules': {
        'lodash-to-native/map': 'warn',
    },
};