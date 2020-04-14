const { validateAuthenticationToken, getCodeAndMessage } = require('../../../../3-777-NodeJS/db/dbHelper');

describe('Токен для подключения к базе данных', () => {
    test('Токен не должен быть пустым', () => {
        const authorization = '';

        const isValid = validateAuthenticationToken(authorization);

        expect(isValid).toBeFalsy();
    });

    test('Токен должен начинаться со схемы `Bearer `', () => {
        const authorization = 'Bearer apiToken';

        const isValid = validateAuthenticationToken(authorization);

        expect(isValid).toBeTruthy();
    });
});

describe('Код и сообщение ошибки при работе с базой данных', () => {
    test('По умолчанию код и сообщение ошибки: 500 Internal Server Error', () => {
        const error = {};

        const codeAndMessage = getCodeAndMessage(error);

        expect(codeAndMessage).toEqual({code: 500, message: 'Internal Server Error'});
    });

    test('Код ошибки может содержаться в сообщении', () => {
        const error = {message: 'Request failed with status code 504'};

        const codeAndMessage = getCodeAndMessage(error);

        expect(codeAndMessage).toEqual({code: 504, message: 'Request failed with status code 504'});
    });

    test('Может быть только код ошибки', () => {
        const error = {code: 404};

        const codeAndMessage = getCodeAndMessage(error);

        expect(codeAndMessage).toEqual({code: 404, message: 'Request failed with status code 404'});
    });

    test('Должен возвращаться только код и сообщение ошибки', () => {
        const error = {code: 400, message: 'Bad Request', stack: 'error stack'};

        const codeAndMessage = getCodeAndMessage(error);

        expect(codeAndMessage).toEqual({code: 400, message: 'Bad Request'});
    });
});