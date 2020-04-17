/**
 * Функция, которая позволит использовать внутри генератора асинхронные вызовы.
 * Реализацию на Promise, async/await использовать запрещено.
 */
function asyncExecutor(generator) {
    const iterator = generator();

    const isPromise = (value) => {
        return Boolean(value && typeof value.then === 'function');
        // Альтернативные варианты, на случай если такой проверки недостаточно
        // return Boolean(value && Object.prototype.toString.call(value) === "[object Promise]");
        // return Boolean(value && value instanceof Promise);
        // return Boolean(value && Promise.resolve(value) === value);
    };

    const runNext = (yieldValue) => {
        const { value, done } = iterator.next(yieldValue);

        if (done) return value;

        if (isPromise(value)) {
            value
                .then((resolvedValue) => runNext(resolvedValue))
                .catch((error) => iterator.throw(error));
        } else {
            runNext(value);
        }
    };

    runNext();
}

// тесты
const ID = 42;
const delayMS = 1000;

function getId() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ID);
        }, delayMS);
    });
}

function getDataById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            id === ID ? resolve('🍎') : reject('💥');
            // Данные символы могут не отображаться в терминале. Альтернативный вариант
            // id === ID ? resolve('apple') : reject('boom');
        }, delayMS);
    });
}

asyncExecutor(function* () {
    // Т.к. функции асинхронные их необходимо обернуть в try catch
    try {
        console.time('Time');

        const id = yield getId();
        const data = yield getDataById(id);
        console.log('Data', data);

        console.timeEnd('Time');
    } catch (error) {
        console.warn(error);
    }
});
