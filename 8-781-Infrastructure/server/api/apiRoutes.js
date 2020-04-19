const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./swagger/swagger.json');
const { saveNewAgent, updateAgentStatus } = require('../agents/agentsHelper');

const router = Router();

router.use((req, res, next) => {
    console.info('Request API:', new Date().toLocaleTimeString(), req.method, req.originalUrl);
    next();
});

router.route('/notify-agent')
    .post(async (req, res) => {
        const { host, port } = req.body;

        const successfully = await saveNewAgent(host, port);

        if (!successfully) {
            return res.status(400).send('Bad request');
        }

        return res.status(200).send('Success');
    });

router.route('/notify-build-result')
    .post(async (req, res) => {
        // TODO Можно ли получить данные порта агента не передавая их в headers?
        const agentHostAndPort = req.get('agent');
        const [host, port] = agentHostAndPort.split(':');

        const agent = {
            host,
            port: +port,
        };
        const successfully = await updateAgentStatus(agent, 'free');

        if (!successfully) {
            return res.status(400).send('Bad request');
        }

        return res.status(200).send('Success');
    });

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

module.exports = router;
