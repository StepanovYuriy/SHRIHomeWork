const axios = require('axios').default;
const { Agent } = require('https');
const { apiToken } = require('../../config');

/**
 * Получение токена для авторизации в базе данных
 * @param {Object} req
 * @return {string}
 */
const getAuthenticationToken = (req) => {
    let authorization = req.get('authorization');

    if (!authorization && apiToken) {
        // Установка специального токена из файла конфигурации
        authorization = `Bearer ${apiToken}`;
    }

    return authorization || '';
};

/**
 * Проверка токена на наличие схемы и ключа
 * @param {string} authorization
 * @return {boolean}
 */
const validateAuthenticationToken = (authorization) => {
    if (!authorization) return false;

    const [scheme, key] = authorization.toString().split(' ');

    return Boolean(scheme === 'Bearer' && key);
};

/**
 * Проверка токена для подключения к базе данных
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Object}
 */
const requireAuthenticationToDB = (req, res, next) => {
    const authorization = getAuthenticationToken(req);

    if (validateAuthenticationToken(authorization)) {
        return next();
    }

    const code = 401;
    const message = 'Возможны 2 варианта авторизации в БД:'
        + ' 1. В headers передать authorization: "Bearer {apiToken}".'
        + ' Для этого можно использовать кнопку Authorize в Swagger'
        + ' 2. В .env файле указать apiToken, как в файле примере(.env.example).'
        + ' Не забыть потом перезапустить сервер';

    console.warn('Не удалось подключиться к БД');
    console.warn('В .env файле необходимо указать apiToken и перезапустить сервер');

    return res.status(code).json({ code, message });
};

/**
 * Создание подключения к базе данных
 * @param {Object} req
 * @return {Object}
 */
const createDBInstance = (req) => axios.create({
    baseURL: 'https://hw.shri.yandex/api',
    timeout: 5000,
    headers: {
        Authorization: getAuthenticationToken(req),
    },
    httpsAgent: new Agent({
        rejectUnauthorized: false,
    }),
});

/**
 * Получение настроек
 * @param {Object} req
 * @return {Object}
 */
const getSettingsFromDB = async (req) => {
    const db = createDBInstance(req);
    const { data } = await db.get('/conf');

    return data;
};

/**
 * Сохранение настроек
 * @param {Object} req
 * @param {Object} settings
 * @return {Object}
 */
const saveSettingsToDB = async (req, settings) => {
    const db = createDBInstance(req);
    return db.post('/conf', settings);
};

/**
 * Получение списка сборок
 * @param {Object} req
 * @param {Object} params
 * @return {Object}
 */
const getBuildListFromDB = async (req, params) => {
    const db = createDBInstance(req);
    const { data } = await db.get('/build/list', { params });

    return data;
};

/**
 * Сохранение новой сборки
 * @param {Object} req
 * @param {Object} commit
 * @return {Object}
 */
const saveNewBuildToDB = async (req, commit) => {
    const db = createDBInstance(req);
    const { data } = await db.post('/build/request', commit);

    return data;
};

/**
 * Получение информации о конкретной сборке
 * @param {Object} req
 * @param {Object} params
 * @return {Object}
 */
const getBuildDetailsFromDB = async (req, params) => {
    const db = createDBInstance(req);
    const { data } = await db.get('/build/details', { params });

    return data;
};

/**
 * Получение логов билда
 * @param {Object} req
 * @param {Object} params
 * @return {Object}
 */
const getBuildLogFromDB = async (req, params) => {
    const db = createDBInstance(req);
    const { data } = await db.get('/build/log', { params });

    return data;
};

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

module.exports = {
    validateAuthenticationToken,
    requireAuthenticationToDB,
    getSettingsFromDB,
    saveSettingsToDB,
    getBuildListFromDB,
    saveNewBuildToDB,
    getBuildDetailsFromDB,
    getBuildLogFromDB,
    getCodeAndMessage,
};
