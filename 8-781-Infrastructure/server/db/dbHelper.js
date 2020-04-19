const axios = require('axios').default;
const { Agent } = require('https');
const { apiToken, apiBaseUrl } = require('../server-conf.json');

/**
 * Получение токена для авторизации в базе данных
 * @return {string}
 */
const getAuthorization = () => (apiToken ? `Bearer ${apiToken}` : '');

/**
 * Проверка токена на наличие схемы и ключа
 * @return {boolean}
 */
const validateAuthorization = () => {
    const authorization = getAuthorization();

    if (!authorization) return false;

    const [scheme, key] = authorization.toString().split(' ');

    return Boolean(scheme === 'Bearer' && key);
};

/**
 * Создание подключения к базе данных
 * @return {Object}
 */
const createDBInstance = () => axios.create({
    baseURL: apiBaseUrl,
    timeout: 5000,
    headers: {
        Authorization: getAuthorization(),
    },
    httpsAgent: new Agent({
        rejectUnauthorized: false,
    }),
});

/**
 * Получение кода и сообщения ошибки при запросах к базе данных
 * @param {Object} error
 * @return {Object}
 */
const getCodeAndMessage = (error) => {
    let { code, message } = error;

    if (code && message) {
        // Всё есть
    } else if (!code && !message) {
        code = 500;
        message = 'Internal Server Error';
    } else if (code) {
        message = `Request failed with status code ${code}`;
    } else if (message) {
        code = parseInt(message.replace('Request failed with status code ', ''));
        if (!code) {
            code = 500;
        }
    }

    return { code, message };
};

/**
 * Получение настроек
 * @param {Object} db
 * @return {Object}
 */
const getSettingsFromDB = async (db) => {
    let settings = null;

    try {
        const { data } = await db.get('/conf');
        settings = data.data;
    } catch (error) {
        console.error('При получении настроек произошла ошибка:', getCodeAndMessage(error.toJSON()));
    }

    return settings;
};

/**
 * Получение списка сборок
 * @param {Object} db
 * @param {Object} params
 * @return {Object}
 */
const getBuildListFromDB = async (db, params) => {
    const builds = {};

    try {
        const { data } = await db.get('/build/list', { params });
        data.data.forEach((build) => {
            builds[build.id] = build;
        });
    } catch (error) {
        console.error('При получении списка сборок произошла ошибка:', getCodeAndMessage(error.toJSON()));
    }

    return builds;
};

module.exports = {
    validateAuthorization,
    createDBInstance,
    getSettingsFromDB,
    getBuildListFromDB,
};
