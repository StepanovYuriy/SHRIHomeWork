const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swagger/swagger.json');
const { requireAuthenticationToDB } = require('../db/dbHelper');
const { getSettingsRoute, saveSettingsRoute } = require('./settings/settingsRoutesHelper');
const { getBuildListRoute, saveNewBuildRoute, getBuildDetailsRoute, getBuildLogRoute } = require('./builds/buildRoutesHelper');

const router = Router();

// Простенькое логирование всех запросов к API
router.use((req, res, next) => {
    console.info('Request API:', new Date().toLocaleTimeString(), req.method, req.originalUrl);
    next();
});

// Получение и сохранение настроек
router.route('/settings')
    .all(requireAuthenticationToDB)
    .get(getSettingsRoute)
    .post(saveSettingsRoute);

// Получение списка сборок и добавление сборки в очередь
router.route('/builds')
    .all(requireAuthenticationToDB)
    .get(getBuildListRoute)
    .post(saveNewBuildRoute);

// Получение информации о конкретной сборке
router.route('/builds/:buildId')
    .all(requireAuthenticationToDB)
    .get(getBuildDetailsRoute);

// Получение логов билда
router.route('/builds/:buildId/logs')
    .all(requireAuthenticationToDB)
    .get(getBuildLogRoute);

// Подключение Swagger. Последний в списке, чтобы не ломать другие маршруты
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

module.exports = router;
