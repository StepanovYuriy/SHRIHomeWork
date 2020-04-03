/**
 * Получение настроек сервера из браузерного хранилища:
 *
 * На данный момент используется для отладки
 *
 * disabled - Данные настроек не кэшируются
 * sessionStorage - Данные настроек кэшируются до окончания сессии текущей страницы
 * localStorage - Данные настроек кэшируются на неограниченный период для любой страницы
 *
 * @param type ['disabled', 'sessionStorage', 'localStorage']
 * @return {null | Object}
 */
const getSettingsFromBrowserStorage = (type = 'sessionStorage') => {
    let settings = null;

    switch (type) {
        case 'sessionStorage':
            try {
                settings = JSON.parse(sessionStorage.getItem('settings'));
                if (settings) console.info('used sessionStorage', settings);
            } catch (error) {
                console.error(error);
            }
            break;

        case 'localStorage':
            try {
                settings = JSON.parse(localStorage.getItem('settings'));
                if (settings) console.info('used localStorage', settings);
            } catch (error) {
                console.error(error);
            }
            break;

        case 'disabled':
        default:
            break;
    }

    return settings;
};

const initialState = {
    fetching: false,
    settings: getSettingsFromBrowserStorage(),
    buildList: [],
    buildLogs: {},
    buildsNotFound: false,
    countLoadedBuilds: 0,
};

export default initialState;
