const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./api/apiRoutes');
const { createBuildServerInstance, registerAgent } = require('./server/serverHelper');
const { port } = require('./agent-conf.json');

const app = express();
const buildServerInstance = createBuildServerInstance();

const stopBuildAgent = () => {
    console.info(`Build-agent stopped at http://localhost:${port}`);
    // eslint-disable-next-line no-use-before-define
    buildAgent.close();
};

const startBuildAgent = async () => {
    console.info(`Build-agent started at http://localhost:${port}`);
    let successfullyRegistered = await registerAgent(buildServerInstance);

    if (!successfullyRegistered) {
        console.info('Вторая попытка регистрации агента');
        successfullyRegistered = await registerAgent(buildServerInstance);
    }

    if (!successfullyRegistered) {
        stopBuildAgent();
        return;
    }
    console.info('Агент успешно зарегистрирован в билд-сервере');
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRoutes);

const buildAgent = app.listen(port, startBuildAgent);
