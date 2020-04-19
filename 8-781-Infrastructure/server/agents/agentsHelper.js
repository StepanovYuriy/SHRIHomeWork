const axios = require('axios').default;
const { Agent } = require('https');
const { readFile, writeFile, access } = require('fs').promises;

const AGENTS_FILE_NAME = 'agents.json';

/**
 * Сохранение списка зарегистрированных агентов в файл
 * @param {Object} agents
 * @return {boolean}
 */
const saveAgentsToFile = async (agents) => {
    let successfully = false;

    try {
        await writeFile(AGENTS_FILE_NAME, JSON.stringify(agents));
        successfully = true;
    } catch (error) {
        console.warn(`Не удалось сохранить список агентов в файл ${AGENTS_FILE_NAME}`);
    }

    return successfully;
};

/**
 * Получение списка зарегистрированных агентов из файла
 * @return {Object}
 */
const getAgentsFromFile = async () => {
    let agents = {};

    try {
        agents = await readFile(AGENTS_FILE_NAME, 'utf8');
        agents = JSON.parse(agents);
    } catch (error) {
        console.warn(`Не удалось считать список агентов из файла ${AGENTS_FILE_NAME}`);

        try {
            await access(AGENTS_FILE_NAME);
            console.error(error);
        } catch (e) {
            await saveAgentsToFile({});
            console.info(`Файл ${AGENTS_FILE_NAME} создан`);
        }
        agents = {};
    }

    return agents;
};

/**
 * Сохранение нового агента
 * @param {string} host
 * @param {number} port
 * @return {boolean}
 */
const saveNewAgent = async (host, port) => {
    console.info('Сохранение нового агента:', host, port);
    let successfully = false;
    if (!host || !port) return successfully;

    try {
        const agentKey = `${host}:${port}`;
        const agents = await getAgentsFromFile();

        agents[agentKey] = {
            host,
            port,
            status: 'free',
        };

        successfully = await saveAgentsToFile(agents);

        if (successfully) {
            console.info('Новый агент успешно сохранён');
        } else {
            console.info('Новый агент не сохранён');
        }
    } catch (error) {
        console.error('Не удалось сохранить нового агента', error);
    }

    return successfully;
};

/**
 * Обновление статуса агента
 * @param {Object} agent
 * @param {string} newStatus
 * @return {boolean}
 */
const updateAgentStatus = async (agent, newStatus) => {
    console.info('Обновление статуса агента:', agent, newStatus);
    let successfully = false;
    if (!agent || !newStatus) return successfully;

    try {
        const { host, port } = agent;
        const agentKey = `${host}:${port}`;
        const agents = await getAgentsFromFile();

        if (agents[agentKey]) {
            agents[agentKey] = {
                ...agents[agentKey],
                status: newStatus,
            };

            successfully = await saveAgentsToFile(agents);
        }

        if (successfully) {
            console.info('Обновлённый агент успешно сохранён');
        } else {
            console.info('Обновлённый агент не сохранён');
        }
    } catch (error) {
        console.error('Не удалось сохранить новый статус агента', error);
    }

    return successfully;
};

/**
 * Создание подключения к билд-агенту
 * @return {Object}
 */
const createBuildAgentInstance = (agent) => {
    const { host, port } = agent;
    return axios.create({
        baseURL: `http://${host}:${port}/api`,
        timeout: 5000,
        httpsAgent: new Agent({
            rejectUnauthorized: false,
        }),
    });
};

/**
 * Запуск сборки с помощью билд-агента
 * @param {Object} buildAgentInstance
 * @param {Object} build
 * @return {Object}
 */
const runBuildByAgent = async (buildAgentInstance, build) => {
    console.info('Запущена сборка с помощью билд-агента', build);
    let successfully = false;

    try {
        const { status, data } = await buildAgentInstance.post('/build', build);
        successfully = status === 200 && data === 'Success';
    } catch (error) {
        console.error('При запуске сборки произошла ошибка');
    }

    return successfully;
};

module.exports = {
    getAgentsFromFile,
    saveNewAgent,
    updateAgentStatus,
    createBuildAgentInstance,
    runBuildByAgent,
};
