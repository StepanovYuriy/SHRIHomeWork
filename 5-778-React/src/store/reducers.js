import initialState from './initialState';
import { SET_BUILD_LIST, SET_FETCHING, SET_SETTINGS } from './actionTypes';

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FETCHING:
            return { ...state, fetching: action.payload };

        case SET_SETTINGS:
            return { ...state, settings: action.payload };

        case SET_BUILD_LIST:
            return { ...state, buildList: action.payload };

        default:
            return state;
    }
};

export default rootReducer;
