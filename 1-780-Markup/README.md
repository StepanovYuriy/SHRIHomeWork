# SHRIHOMEWORKIII-780 - Вёрстка

## Общие пояснения к работе

Все файлы, относящиеся к этому домашнему заданию, находятся в папке `/1-780-Markup`

При решении использовались `только html и css`. Сторонние инструменты и библиотеки будут применяться исходя из условий следующих связанных домашних заданий.

Для именования БЭМ сущностей был выбран [React стиль](https://ru.bem.info/methodology/naming-convention/#%D1%81%D1%82%D0%B8%D0%BB%D1%8C-react). На это повлияла связанность домашних заданий, последующие темы связанные с React, а также примеры из лекции.

Для организации файловой структуры была выбрана [Flex схема](https://ru.bem.info/methodology/filestructure/#flex), ввиду ограниченных сроков и дальшейних планов на переход к SCSS в следующих домашних заданиях.

___

## Ответы на вопросы

__1. Правильное использование БЭМ-сущностей__

> Вопрос: Какие части макета являются одним и тем же блоком?

[Блок](https://ru.bem.info/methodology/key-concepts/#%D0%B1%D0%BB%D0%BE%D0%BA) - логически и функционально независимый компонент страницы, который может быть повторно использован. Само определение блока и является ответом на вопрос.

Для 4 макетов в задании получилось выделить 12 блоков: Page, Header, Content, Footer, Form, List, Card, Log, Button, Input, Text, Icon, Link. Допускаю, что некоторые из них можно (нужно) заменить на элементы блоков

> Вопрос: Какие стили относятся к блокам, а какие к элементам и модификаторам?

[Элемент](https://ru.bem.info/methodology/key-concepts/#%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82) - составная (необязательная) часть блока, которая не может использоваться в отрыве от него.

[Модификатор](https://ru.bem.info/methodology/key-concepts/#%D0%BC%D0%BE%D0%B4%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80) - сущность, определяющая внешний вид, состояние или поведение блока либо элемента.

Сами определения понятий, также как и в первом вопросе содержат ответ.

> Вопрос: Где нужно использовать каскады и почему?

Если под "каскадами" подразумеваются "вложенные селекторы", то ответ следующий.

Методология БЭМ допускает использование [вложенных селекторов](https://ru.bem.info/methodology/css/#%D0%B2%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D1%81%D0%B5%D0%BB%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D1%8B), но рекомендует свести их применение к минимуму. Вложенные селекторы увеличивают связность кода и делают его повторное использование невозможным.

При использовании вложенных селекторов важно соблюдать принцип инкапсуляции: правила одного блока не должны влиять на внутренний мир другого блока. Элементы — это внутренняя реализация блока. Таким образом, блок влияет только на свои элементы и не может воздействовать на элементы другого блока.

Вложенность уместна, если необходимо изменить стили элементов в зависимости от модификатора.


__2. Консистентность__

> Вопрос: Какие видите базовые и семантические константы?

К константам и переменным в коде добавлены комментарии.

> Вопрос: Какие видите закономерности в интерфейсе?

Закономерности интерфейса, либо выделены в блоки, либо вынесены в константы. Затрудняюсь ответить более конкретно на данный вопрос.

__3. Адаптивность__


> Вопрос: Где видите вариативность данных и как это обрабатываете?

Вариативность данных хорошо заметна в блоке Card, обрабатывается созданием различных модификаторов.

> Вопрос: Какие видите особенности, связанные с размером экрана?

Более "линейная" вёрстка одним столбцом. Увеличенные размеры кнопок, а также скрытые названия там, где это не так важно. Увеличенные отсупы между блоками/элементами, уменьшенные до минимума отступы от краёв браузера.

> Вопрос: Что еще повлияло на вашу вёрстку?

В первую очередь время. Некоторые мелочи остались недоделаны. Сложные моменты, которые не удалось сделать сразу, так и остались со "временными" решениями.

Изначально я попытался найти наибольшее количество зависимостей, выделить блоки и ответить на теоретические вопросы. На это ушло слишком много времени, а конечный результат - вёрстка - продвигался очень медленно. Менялись названия констант и значения, появлялись новые. Реализация многих сущностей также менялась вместе с появлением новых. В конечном итоге я принял решение изменить подход. Сделал "черновую" вёрстку, а после подогнал константы и стили. Возможно, это не совсем верный подход, но по-другому вообще не успел бы.

Также на вёрстку повлияло отсутствие опыта работы с методолией БЭМ и разработки дизайн системы с нуля. Вёрстка под экраны мобильных телефонов также для меня была первым практическим опытом в этом направлении адаптивности

___

Общий файл [README.md](../README.md) для всех домашних работ.
