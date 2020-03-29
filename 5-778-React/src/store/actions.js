import axios from 'axios';
import { SET_BUILD_LIST, SET_FETCHING, SET_SETTINGS } from './actionTypes';

export const setFetching = (fetching) => ({ type: SET_FETCHING, payload: fetching });

export const setBuildList = (buildList) => ({ type: SET_BUILD_LIST, payload: buildList });

export const setSettings = (settings) => ({ type: SET_SETTINGS, payload: settings });

export const getBuildListRequest = () => (dispatch) => {
    dispatch(setFetching(true));

    axios.get('/api/builds?limit=25')
        .then((response) => dispatch(setBuildList(response.data.data)))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setFetching(false)));
};

export const getSettingsRequest = () => (dispatch) => {
    dispatch(setFetching(true));

    axios.get('/api/settings')
        .then(({ data }) => {
            sessionStorage.setItem('settings', JSON.stringify(data.data));
            localStorage.setItem('settings', JSON.stringify(data.data));
            dispatch(setSettings(data.data));
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setFetching(false)));
};

export const saveSettingsRequest = (settings) => (dispatch) => {
    dispatch(setFetching(true));

    axios.post('/api/settings', settings)
        .then(({ data }) => {
            sessionStorage.setItem('settings', JSON.stringify(data.data));
            localStorage.setItem('settings', JSON.stringify(data.data));
            dispatch(setSettings(data.data));
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setFetching(false)));
};
