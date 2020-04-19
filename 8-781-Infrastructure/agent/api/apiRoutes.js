const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swagger/swagger.json');
const { makeBuild } = require('../build/buildHelper');

const router = Router();

router.use((req, res, next) => {
    console.info('Request API:', new Date().toLocaleTimeString(), req.method, req.originalUrl);
    next();
});

router.route('/build')
    .post((req, res) => {
        const { buildId, commitHash, repoName, buildCommand } = req.body;

        if (!buildId || !commitHash || !repoName || !buildCommand) {
            console.warn('Недостаточно данных для начала сборки');
            return res.status(400).send('Bad request');
        }

        makeBuild({ buildId, commitHash, repoName, buildCommand });
        return res.status(200).send('Success');
    });

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

module.exports = router;
