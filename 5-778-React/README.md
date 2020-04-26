# SHRIHOMEWORKIII-778 - React

## Общие пояснения к работе

Все файлы, относящиеся к этому домашнему заданию, находятся в папке [`/5-778-React`](./)

Сервер на Node.js [с инструкцией](../3-777-NodeJS/README.md) для запуска из третьего задания [`/3-777-NodeJS`](../3-777-NodeJS)

## Запуск приложения

__Важно:__ Не забыть в начале запустить сервер на Node.js

1. Перейти в терминале в директорию задания: [`/5-778-React`](./)
2. Установить зависимости `npm сi`
3. Собрать бандлы `npm run build`
4. Открыть [http://localhost:3001](http://localhost:3001/)

## Запуск приложения для режима разработки

__Важно:__ Не забыть в начале запустить сервер на Node.js

1. Перейти в терминале в директорию задания: [`/5-778-React`](./)
2. Установить зависимости `npm сi`
3. Запустить сервер разработки `npm start`
4. Откроется [http://localhost:3000](http://localhost:3000/api/)

___

## Пояснения по вёрстке

При переносе вёрстки из первого задания стали очевидны проблемы при определении блоков и элементов.
Некоторые блоки стали лишними, других наоборот не хватало. Также были учтены замечания проверяющего. 

Так как многие стили не подходили под компоненты, было принято решение переработать их с использованием SCSS. 
Благодаря этому я наконец-то познакомился с SCSS не только на уровне теории, хотя использовал лишь конструкцию &.
Минусом такого решения стала потеря адаптивности (под мобильные приложения), т.к. это было оставлено напоследок

Разработка велась в Google Chrome, остальные браузеры не проверялись. Поддержка IE отсутствует

___

## Пояснения по React

Чтобы не тратить дни и недели на собственную сборку, было использовано рекомендуемое готовое решение [Create React App](https://create-react-app.dev/)

Также этот инструмент позволил инлайнить svg в код, как компоненты, и не создавать отдельный компонент с изображениями. 
Все детали реализации такого способа инкапсулированы в CRA.
Почитать про это можно [тут](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs).

Работая с React'ом до этого только на компонентах-классах, поставил себе цель познакомиться с функциями и хуками.
Изучение для себя считаю успешным, однако это также негативно сказалось на скорости выполнения работы

___

## Используемые сторонние пакеты

1. `axios` (по совету из лекции по Node.js, к тому же на бэкенде это уже используется для подключения к БД)
2. `classnames` - удобный инструмент для объединения стилей. 
Допускаю, что работа с методологией БЭМ и React может быть проще с использованием специально написанных для этого инструментов, 
однако использовал ранее знакомое и проверенное решение
3. `date-fns` (по совету из задания) - Лёгкий пакет для работы с датами
4. `date-fns-tz` - для часовых поясов
5. `node-sass` - необходим для работы с svg файлами
6. `prop-types` - для описания пропсов компонентов
7. `react` - для работы React
8. `react-dom` - для работы React
9. `react-redux` - для создания единого хранилища приложения
10. `react-router-dom` - для организации работы SPA
11. `react-scripts` - для работы CRA
12. `redux` (по совету из лекции) - изначально пытался обойтись без Redux на хуках и контексте, однако достаточно быстро понял, что потратил время не на то.
Альтернативные менеджеры хранилища можно было бы попытаться изучить и внедрить при большем количестве времени и исключительно в самообразовательных целях (Redux мне был знаком)
13. `redux-devtools-extension` - для упрощения подключения [плагина](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ru) для работы с Redux
14. `redux-thunk` - для возможности работы с асинхронными событиями

Дополнительные пакеты:

1. `eslint` - помимо поддержания стиля позволяет придерживаться лучших практик при работе с React'ом, а также избегать ошибок при работе с хуками

___

Общий файл [README.md](../README.md) для всех домашних работ.