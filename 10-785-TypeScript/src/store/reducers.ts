import initialState, { RootState } from './initialState';
import { Action, SET_BUILD_LIST, SET_BUILD_LOGS, SET_COUNT_LOADED_BUILDS, SET_FETCHING, SET_SETTINGS } from './types';

const rootReducer = (state: RootState = initialState, action: Action): RootState => {
    switch (action.type) {
        case SET_FETCHING: {
            const { fetching } = action;

            return { ...state, fetching };
        }

        case SET_SETTINGS: {
            const { settings } = action;

            return { ...state, settings };
        }

        case SET_BUILD_LIST: {
            const { buildList, buildsNotFound } = action;

            return { ...state, buildList, buildsNotFound };
        }

        case SET_BUILD_LOGS: {
            const { buildLogs } = action;

            return { ...state, buildLogs };
        }

        case SET_COUNT_LOADED_BUILDS: {
            const { countLoadedBuilds } = action;

            return { ...state, countLoadedBuilds };
        }

        default:
            return state;
    }
};

export default rootReducer;
