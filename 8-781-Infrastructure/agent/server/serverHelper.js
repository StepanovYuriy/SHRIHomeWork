const axios = require('axios').default;
const { Agent } = require('https');
const { serverHost, serverPort, port } = require('../agent-conf.json');

/**
 * Создание подключения к билд-серверу
 * @return {Object}
 */
const createBuildServerInstance = () => axios.create({
    baseURL: `http://${serverHost}:${serverPort}/api`,
    timeout: 5000,
    httpsAgent: new Agent({
        rejectUnauthorized: false,
    }),
});

/**
 * Регистрация агента в билд-сервере
 * @param {Object} buildServerInstance
 * @return {Object}
 */
const registerAgent = async (buildServerInstance) => {
    let successfully = false;

    try {
        const { status, data } = await buildServerInstance.post('/notify-agent', { host: 'localhost', port });
        successfully = status === 200 && data === 'Success';
    } catch (error) {
        console.error('При регистрации агента произошла ошибка');
    }

    return successfully;
};

module.exports = {
    createBuildServerInstance,
    registerAgent,
};
