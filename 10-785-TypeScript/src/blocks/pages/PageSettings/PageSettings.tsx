import React, { useState } from 'react';
import './PageSettings.scss';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Page from '../../common/Page/Page';
import Header, { TitleType } from '../../common/Header/Header';
import Footer from '../../common/Footer/Footer';
import Button, { Size, Type } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { saveSettingsRequest } from '../../../store/actions';
import { MainSettings, RootState } from '../../../store/initialState';

const PageSettings: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { settings, fetching } = useSelector((state: RootState) => state, shallowEqual);

    const [repoName, setRepoName] = useState(settings.repoName);
    const [buildCommand, setBuildCommand] = useState(settings.buildCommand);
    const [mainBranch, setMainBranch] = useState(settings.mainBranch);
    const [period, setPeriod] = useState(settings.period);

    const onClickButtonSave = (): void => {
        const newSettings: MainSettings = {
            repoName,
            buildCommand,
            mainBranch,
            period,
        };

        dispatch(saveSettingsRequest(newSettings));
    };

    const onClickButtonCancel = (): void => {
        history.push('/');
    };

    const onChangeRepoName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRepoName(event.target.value);
    };

    const onChangeBuildCommand = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setBuildCommand(event.target.value);
    };

    const onChangeBranch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMainBranch(event.target.value);
    };

    const onChangeSynchronizeTime = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (+event.target.value >= 0) {
            setPeriod(+event.target.value);
        }
    };

    return (
        <Page>
            <Header title="School CI server" titleType={TitleType.settings} />
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
                    <Button size={Size.m}
                            type={Type.action}
                            text="Save"
                            onClick={onClickButtonSave}
                            disabled={fetching || repoName === '' || buildCommand === ''}
                            mixedClassNames="PageSettings-Button_space_right"
                    />
                    <Button size={Size.m}
                            type={Type.default}
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
