import React, { useState } from 'react';
import './PageSettings.scss';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Page from '../../common/Page/Page';
import Header from '../../common/Header/Header';
import Footer from '../../common/Footer/Footer';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { saveSettingsRequest } from '../../../store/actions';

const PageSettings = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { settings, fetching } = useSelector((state) => state, shallowEqual);

    const initRepoName = () => (settings && settings.repoName) || '';
    const initBuildCommand = () => (settings && settings.buildCommand) || 'npm ci && npm run build';
    const initMainBranch = () => (settings && settings.mainBranch) || 'master';
    const initPeriod = () => (settings && settings.period) || 0;

    const [repoName, setRepoName] = useState(initRepoName());
    const [buildCommand, setBuildCommand] = useState(initBuildCommand());
    const [mainBranch, setMainBranch] = useState(initMainBranch());
    const [period, setPeriod] = useState(initPeriod());

    const onClickButtonSave = () => {
        const newSettings = {
            repoName,
            buildCommand,
            mainBranch,
            period,
        };

        dispatch(saveSettingsRequest(newSettings));
    };

    const onClickButtonCancel = () => {
        history.push('/');
    };

    const onChangeRepoName = (event) => setRepoName(event.target.value);

    const onChangeBuildCommand = (event) => setBuildCommand(event.target.value);

    const onChangeBranch = (event) => setMainBranch(event.target.value);

    const onChangeSynchronizeTime = (event) => {
        if (+event.target.value >= 0) {
            setPeriod(+event.target.value);
        }
    };

    return (
        <Page>
            <Header title="School CI server" titleType="settings" />
            <div className="Page-Content PageSettings-Form">
                <div className="PageSettings-Title">
                    Settings
                </div>
                <div className="PageSettings-Description">
                    Configure repository connection and synchronization settings.
                </div>
                <Input value={repoName}
                       onChange={onChangeRepoName}
                       label="GitHub repository"
                       placeholder="user-name/repo-name"
                       required
                />
                <Input value={buildCommand}
                       onChange={onChangeBuildCommand}
                       label="Build command"
                       placeholder="npm ci && npm run build"
                       required
                       mixedClassNames="PageSettings-Field_space_top"
                />
                <Input value={mainBranch}
                       onChange={onChangeBranch}
                       label="Main branch"
                       placeholder="master"
                       mixedClassNames="PageSettings-Field_space_top"
                />
                <div className="PageSettings-Field PageSettings-Field_space_top">
                    <div className="PageSettings-Label">Synchronize every</div>
                    <Input value={period}
                           onChange={onChangeSynchronizeTime}
                           textRight
                           mixedClassNames="PageSettings-NumberInput"
                    />
                    <div className="PageSettings-Label">minutes</div>
                </div>
                <div className="PageSettings-Buttons">
                    <Button size="m"
                            type="action"
                            text="Save"
                            onClick={onClickButtonSave}
                            disabled={fetching || repoName === '' || buildCommand === ''}
                            mixedClassNames="PageSettings-Button_space_right"
                    />
                    <Button size="m"
                            type="default"
                            text="Cancel"
                            onClick={onClickButtonCancel}
                            disabled={fetching}
                    />
                </div>
            </div>
            <Footer />
        </Page>
    );
};

export default PageSettings;
