const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./api/apiRoutes');
const {
    getAgentsFromFile,
    createBuildAgentInstance,
    runBuildByAgent,
    updateAgentStatus,
} = require('./agents/agentsHelper');
const { port } = require('./server-conf.json');
const { validateAuthorization, createDBInstance, getSettingsFromDB, getBuildListFromDB } = require('./db/dbHelper');

if (!validateAuthorization()) {
    console.warn('Не указан apiToken в конфигурационном файле');
    process.exit(0);
}

const app = express();
const db = createDBInstance();
let settings = null;

/**
 * Проверка ожидающих сборки билдов
 */
const checkBuilds = async () => {
    console.info('\nЗапущена проверка:', new Date().toISOString());

    const agents = await getAgentsFromFile();

    if (Object.values(agents).length === 0) {
        console.warn('Зарегистрированных агентов нет');
        return;
    }

    if (Object.values(agents).filter((agent) => agent.status === 'free').length === 0) {
        console.warn('Свободных агентов нет');
        return;
    }

    const builds = await getBuildListFromDB(db, { limit: 1, offset: 0 });

    Object.values(builds).forEach(async (build) => {
        if (build.status === 'Waiting') {
            const freeAgent = Object.values(agents).find((agent) => agent.status === 'free');

            if (freeAgent) {
                const buildAgentInstance = createBuildAgentInstance(freeAgent);
                const buildData = {
                    buildId: build.id,
                    commitHash: build.commitHash,
                    repoName: settings.repoName,
                    buildCommand: settings.buildCommand,
                };

                const successfully = await runBuildByAgent(buildAgentInstance, buildData);
                if (successfully) {
                    updateAgentStatus(freeAgent, 'inWork');
                }
            }
        }
    });
};

/**
 * Остановка билд-сервера
 */
const stopBuildServer = () => {
    console.info(`Build-server stopped at http://localhost:${port}`);
    // eslint-disable-next-line no-use-before-define
    buildServer.close();
};

/**
 * Запуск билд-сервера
 */
const startBuildServer = async () => {
    console.info(`Build-server started at http://localhost:${port}`);
    settings = await getSettingsFromDB(db);

    if (!settings) {
        console.info('Вторая попытка получения настроек');
        settings = await getSettingsFromDB(db);
    }

    if (!settings) {
        stopBuildServer();
        return;
    }

    const minutes = settings.period || 1;
    console.info(`Интервал проверки ${minutes} минут`);
    setInterval(checkBuilds, minutes * 60 * 1000);

    checkBuilds();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRoutes);

const buildServer = app.listen(port, startBuildServer);
