const { Router } = require('express');
const axios = require('axios').default;
const { Agent } = require('https');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swagger/swagger.json');
const { apiToken } = require('../config');
const { getCommitByHash, runGitClone } = require('../git/gitHelper');

const router = Router();

const axiosDBInstance = axios.create({
    baseURL: 'https://hw.shri.yandex/api',
    timeout: 5000,
    headers: {
        Authorization: 'Bearer',
    },
    httpsAgent: new Agent({
        rejectUnauthorized: false,
    }),
});

const requireAuthenticationToDB = (req, res, next) => {
    let authorization = req.get('authorization');

    if (!authorization && apiToken) {
        // Установка специального токена из файла конфигурации
        authorization = `Bearer ${apiToken}`;
    }

    if (authorization) {
        const [scheme, key] = authorization.toString().split(' ');
        if (scheme === 'Bearer' && key) {
            // Установка токена в заголовке Authorization
            axiosDBInstance.defaults.headers.Authorization = authorization;

            return next();
        }
    }

    const code = 401;
    const message = 'Возможны 2 варианта авторизации в БД:'
        + ' 1. В headers передать authorization: "Bearer {apiToken}".'
        + ' Для этого можно использовать кнопку Authorize в Swagger'
        + ' 2. В .env файле указать apiToken, как в файле примере(.env.example).'
        + ' Не забыть потом перезапустить сервер';
    return res.status(code).json({ code, message });
};

const getCodeAndMessage = (error) => {
    // eslint-disable-next-line prefer-const
    let { code, message, stack } = error.toJSON();
    console.error(stack);

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

// Простенькое логирование всех запросов к API
router.use((req, res, next) => {
    console.info('Request API:', new Date().toLocaleTimeString(), req.method, req.originalUrl);
    next();
});

// Получение и сохранение настроек
router.route('/settings')
    .all(requireAuthenticationToDB)
    .get(async (req, res) => {
        try {
            const { data } = await axiosDBInstance.get('/conf');
            return res.json(data);
        } catch (error) {
            const { code, message } = getCodeAndMessage(error);
            return res.status(code).json({ code, message });
        }
    })
    .post(async (req, res) => {
        try {
            const { repoName, buildCommand, mainBranch, period } = req.body;

            if (!repoName || !buildCommand || !mainBranch || Number.isNaN(period)) {
                const code = 400;
                const message = 'Заполнены не все поля';
                return res.status(code).json({ code, message });
            }

            try {
                await runGitClone(repoName);
            } catch (error) {
                const code = 400;
                const message = 'Не удалось создать локальную копию репозитория';
                return res.status(code).json({ code, message });
            }
            await axiosDBInstance.post('/conf', { ...req.body });
            const { data } = await axiosDBInstance.get('/conf');
            return res.json(data);
        } catch (error) {
            const { code, message } = getCodeAndMessage(error);
            return res.status(code).json({ code, message });
        }
    });

// Получение списка сборок и добавление сборки в очередь
router.route('/builds')
    .all(requireAuthenticationToDB)
    .get(async (req, res) => {
        try {
            const params = { ...req.query };

            const { data } = await axiosDBInstance.get('/build/list', { params });
            return res.json(data);
        } catch (error) {
            const { code, message } = getCodeAndMessage(error);
            return res.status(code).json({ code, message });
        }
    })
    .post(async (req, res) => {
        const { commitHash } = req.body;
        let commit = null;

        try {
            const { data } = await axiosDBInstance.get('/conf');
            commit = await getCommitByHash(commitHash, data.data);
        } catch (error) {
            const code = 400;
            const message = `Не удалось получить данные для commitHash: ${commitHash}`;
            return res.status(code).json({ code, message });
        }

        try {
            const { data } = await axiosDBInstance.post('/build/request', commit);
            return res.json(data);
        } catch (error) {
            const { code, message } = getCodeAndMessage(error);
            return res.status(code).json({ code, message });
        }
    });

// Получение информации о конкретной сборке
router.route('/builds/:buildId')
    .all(requireAuthenticationToDB)
    .get(async (req, res) => {
        try {
            const params = { ...req.params };

            const { data } = await axiosDBInstance.get('/build/details', { params });
            return res.json(data);
        } catch (error) {
            const { code, message } = getCodeAndMessage(error);
            return res.status(code).json({ code, message });
        }
    });

// Получение логов билда
router.route('/builds/:buildId/logs')
    .all(requireAuthenticationToDB)
    .get(async (req, res) => {
        try {
            const params = { ...req.params };

            const { data } = await axiosDBInstance.get('/build/log', { params });
            return res.json(data);
        } catch (error) {
            const { code, message } = getCodeAndMessage(error);
            return res.status(code).json({ code, message });
        }
    });

// Подключение Swagger. Последний в списке, чтобы не ломать другие маршруты
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

module.exports = router;
