const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./api/apiRoutes');

const app = express();

// Подключение body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Подключение статики. Главная страница и домашняя работа по вёрстке
app.use(express.static(path.resolve(__dirname, './static')));
app.use(express.static(path.resolve(__dirname, './../1-780-Markup')));

// Подключение маршрутов для API
app.use('/api', apiRoutes);

// Обработка всех ошибок
app.use((err, req, res) => {
    console.error(err.stack);
    return res.status(500).send('Something broken!');
});

// Старт сервера
app.listen(3000, () => console.log(`Server started at http://localhost:3000`));
