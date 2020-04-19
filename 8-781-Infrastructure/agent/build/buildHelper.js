const { createBuildServerInstance, saveBuildResult } = require('../server/serverHelper');
const { port } = require('../agent-conf.json');

/**
 * Отправка результатов сборки на билд-сервер
 * @param {Object} buildResult
 */
const sendBuildResultToServer = async (buildResult) => {
    console.info('Отправка результатов результатов сборки', buildResult);
    const buildServerInstance = createBuildServerInstance();

    let successfullySent = await saveBuildResult(buildServerInstance, buildResult);

    if (!successfullySent) {
        console.info('Вторая попытка отправки результатов сборки');
        successfullySent = await saveBuildResult(buildServerInstance, buildResult);
    }

    if (!successfullySent) {
        console.info('Третья попытка отправки результатов сборки');
        successfullySent = await saveBuildResult(buildServerInstance, buildResult);
    }

    if (!successfullySent) {
        console.warn('\nНе удалось соединиться с билд-сервером после нескольких попыток.\n'
            + 'Наиболее вероятные причины такой ситуации: \n'
            + ' - билд-сервер ошибочно или корректно завершил работу\n'
            + 'Процесс агента будет завершён.');

        console.info(`Build-agent stopped at http://localhost:${port}`);
        // TODO Придумать как вызвать функцию stopBuildServer()
        process.exit(0);
    }
    console.info('Результаты сборки успешно зарегистрированы в билд-сервере');
};

/**
 * Запуск сборки
 * @param {Object} build
 */
const makeBuild = (build) => {
    console.info('makeBuild', build);
    // Временная заглушка на выполнение сборки
    const randomInteger = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));
    const time = randomInteger(5, 20);

    console.info('Ориентировочное время завершения сборки (сек):', time);

    setTimeout(() => {
        sendBuildResultToServer({ example: 'test' });
    }, time * 1000);
};

module.exports = {
    makeBuild,
};
