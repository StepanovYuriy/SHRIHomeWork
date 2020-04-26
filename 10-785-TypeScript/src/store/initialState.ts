export enum Status {
    Waiting = 'Waiting',
    InProgress = 'InProgress',
    Success = 'Success',
    Fail = 'Fail',
    Canceled = 'Canceled',
}

export interface Build {
    id: string;
    buildNumber: number;
    status: Status;
    commitMessage: string;
    branchName: string;
    commitHash: string;
    authorName: string;
    start?: string;
    duration?: number;
}

export interface MainSettings {
    id?: string;
    repoName: string;
    buildCommand: string;
    mainBranch: string;
    period: number;
}

export interface RootState {
    fetching: boolean;
    settings: MainSettings;
    buildList: Build[];
    buildLogs: Record<string, any>;
    buildsNotFound: boolean;
    countLoadedBuilds: number;
}

const initialState: RootState = {
    fetching: false,
    settings: {
        id: '',
        repoName: '',
        buildCommand: 'npm ci && npm run build',
        mainBranch: 'master',
        period: 0,
    },
    buildList: [],
    buildLogs: {},
    buildsNotFound: false,
    countLoadedBuilds: 0,
};

export default initialState;
