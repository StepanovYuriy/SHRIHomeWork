const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./api/apiRoutes');

const app = express();

// Подключение body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Подключение статики
app.use(express.static(path.resolve(__dirname, '../build')));

// Подключение маршрутов для API
app.use('/api', apiRoutes);

// Редирект на главную страницу
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

// Обработка всех ошибок
app.use((err, req, res) => {
    console.error(err.stack);
    return res.status(500).send('Something broken!');
});

// Старт сервера
app.listen(3001, () => console.info('Server started at http://localhost:3001'));
