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
        console.info('Билд собран');
    }, time * 1000);
};

module.exports = {
    makeBuild,
};
