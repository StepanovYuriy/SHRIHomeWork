import axios from 'axios';
import { SET_BUILD_LIST, SET_BUILD_LOGS, SET_COUNT_LOADED_BUILDS, SET_FETCHING, SET_SETTINGS } from './actionTypes';

export const setFetching = (fetching) => (
    { type: SET_FETCHING, fetching }
);

export const setBuildList = (buildList, buildsNotFound) => (
    { type: SET_BUILD_LIST, buildList, buildsNotFound }
);

export const setCountLoadedBuilds = (countLoadedBuilds) => (
    { type: SET_COUNT_LOADED_BUILDS, countLoadedBuilds }
);

export const setBuildLogs = (buildLogs) => (
    { type: SET_BUILD_LOGS, buildLogs }
);

export const setSettings = (settings) => (
    { type: SET_SETTINGS, settings }
);

export const getBuildListRequest = () => (dispatch, getState) => {
    const offset = getState().countLoadedBuilds;
    const limit = 10;

    dispatch(setFetching(true));

    axios.get(`/api/builds?offset=${offset}&limit=${limit}`)
        .then((response) => response.data.data)
        .then((newBuildList) => {
            const buildsNotFound = Boolean(offset === 0 && newBuildList.length === 0);

            let buildList = [...getState().buildList];
            buildList = buildList.concat(newBuildList);

            dispatch(setBuildList(buildList, buildsNotFound));
            dispatch(setCountLoadedBuilds(offset + limit));
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setFetching(false)));
};

export const getBuildRequest = (buildId) => (dispatch, getState) => {
    dispatch(setFetching(true));

    axios.get(`/api/builds/${buildId}`)
        .then((response) => response.data.data)
        .then((build) => {
            const buildList = [...getState().buildList];
            buildList.push(build);

            dispatch(setBuildList(buildList));
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setFetching(false)));
};

export const getBuildLogRequest = (buildId) => (dispatch, getState) => {
    dispatch(setFetching(true));

    axios.get(`/api/builds/${buildId}/logs`)
        .then((response) => {
            const buildLogs = { ...getState().buildLogs };
            buildLogs[buildId] = response.data;

            dispatch(setBuildLogs(buildLogs));
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setFetching(false)));
};

export const runBuildRequest = async (commitHash) => {
    let newBuildId = null;

    await axios.post('/api/builds', { commitHash })
        .then((response) => response.data.data)
        .then((build) => {
            newBuildId = build.id;
        })
        .catch((error) => console.error(error));

    return newBuildId;
};

export const getSettingsRequest = () => (dispatch) => {
    dispatch(setFetching(true));

    axios.get('/api/settings')
        .then((response) => response.data.data)
        .then((settings) => {
            sessionStorage.setItem('settings', JSON.stringify(settings));
            localStorage.setItem('settings', JSON.stringify(settings));
            dispatch(setSettings(settings));
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setFetching(false)));
};

export const saveSettingsRequest = (newSettings) => (dispatch) => {
    dispatch(setFetching(true));

    axios.post('/api/settings', newSettings)
        .then((response) => response.data.data)
        .then((settings) => {
            sessionStorage.setItem('settings', JSON.stringify(settings));
            localStorage.setItem('settings', JSON.stringify(settings));
            dispatch(setSettings(settings));
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setFetching(false)));
};
