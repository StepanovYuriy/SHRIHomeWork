/**
 * Функция, которая принимает объект и возвращает все свойства и символы
 * как в самом объекте, так и во всей его цепочке прототипов.
 */
function allKeysAndSymbols(object) {
    return Reflect.ownKeys(object).concat(Reflect.ownKeys(object.__proto__));
}

console.log(allKeysAndSymbols({}));
