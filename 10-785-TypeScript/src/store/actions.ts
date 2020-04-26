import axios from 'axios';
import { Build, MainSettings } from './initialState';
import {
    ActionCreator,
    SET_BUILD_LIST,
    SET_BUILD_LOGS,
    SET_COUNT_LOADED_BUILDS,
    SET_FETCHING,
    SET_SETTINGS,
    SetBuildListAction,
    SetBuildLogsAction,
    SetCountLoadedBuildsAction,
    SetFetchingAction,
    SetSettingsAction,
} from './types';


export const setFetching = (fetching: boolean): SetFetchingAction => (
    { type: SET_FETCHING, fetching }
);

export const setBuildList = (buildList: Build[], buildsNotFound: boolean): SetBuildListAction => (
    { type: SET_BUILD_LIST, buildList, buildsNotFound }
);

export const setCountLoadedBuilds = (countLoadedBuilds: number): SetCountLoadedBuildsAction => (
    { type: SET_COUNT_LOADED_BUILDS, countLoadedBuilds }
);

export const setBuildLogs = (buildLogs: Record<string, any>): SetBuildLogsAction => (
    { type: SET_BUILD_LOGS, buildLogs }
);

export const setSettings = (settings: MainSettings): SetSettingsAction => (
    { type: SET_SETTINGS, settings }
);

export const getBuildListRequest = () => (dispatch: any, getState: any): ActionCreator => {
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

export const getBuildRequest = (buildId: string) => (dispatch: any, getState: any): ActionCreator => {
    dispatch(setFetching(true));

    axios.get(`/api/builds/${buildId}`)
        .then((response) => response.data.data)
        .then((build) => {
            const buildList = [...getState().buildList];
            buildList.push(build);

            dispatch(setBuildList(buildList, false));
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setFetching(false)));
};

export const getBuildLogRequest = (buildId: string) => (dispatch: any, getState: any): ActionCreator => {
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

export const runBuildRequest = async (commitHash: string): Promise<any> => {
    let newBuildId = null;

    await axios.post('/api/builds', { commitHash })
        .then((response) => response.data.data)
        .then((build) => {
            newBuildId = build.id;
        })
        .catch((error) => console.error(error));

    return newBuildId;
};

export const getSettingsRequest = () => (dispatch: any): ActionCreator => {
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

export const saveSettingsRequest = (newSettings: MainSettings) => (dispatch: any): ActionCreator => {
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
