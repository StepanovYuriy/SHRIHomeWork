const _ = require('lodash');

const fn = (value) => +value;

_.map({a: 1, b: 2}, fn);
[2, 3, 4].map(fn);

const array1 = [1, 2, 3];
const array2 = _.map(array1, function (value) {
    return value * 2;
});

const array3 = _.map([1, 2, 3], function (value) {
    return value * 2;
});

const array4 = _.map({ a: 1, b: 2 }, function (value) {
    return value * 2;
});

const array5 = _.map(array2, fn);