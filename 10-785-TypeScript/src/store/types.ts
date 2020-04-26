import { Build, MainSettings } from './initialState';

export const SET_FETCHING = 'SET_FETCHING';
export const SET_BUILD_LIST = 'SET_BUILD_LIST';
export const SET_BUILD_LOGS = 'SET_BUILD_LOGS';
export const SET_COUNT_LOADED_BUILDS = 'SET_COUNT_LOADED_BUILDS';
export const SET_SETTINGS = 'SET_SETTINGS';

export interface SetFetchingAction {
    type: typeof SET_FETCHING;
    fetching: boolean;
}

export interface SetSettingsAction {
    type: typeof SET_SETTINGS;
    settings: MainSettings;
}

export interface SetBuildListAction {
    type: typeof SET_BUILD_LIST;
    buildList: Build[];
    buildsNotFound: boolean;
}

export interface SetBuildLogsAction {
    type: typeof SET_BUILD_LOGS;
    buildLogs: Record<string, any>;
}

export interface SetCountLoadedBuildsAction {
    type: typeof SET_COUNT_LOADED_BUILDS;
    countLoadedBuilds: number;
}

// TODO Так и не смог разобраться, что тут не так
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export type Action = SetFetchingAction
    | SetSettingsAction
    | SetBuildListAction
    | SetBuildLogsAction
    | SetCountLoadedBuildsAction;

// TODO Надо ли как-то отдельно выделять этот тип? И как правильно его писать?
export type ActionCreator = any;
