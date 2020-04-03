import React, { useEffect, useMemo } from 'react';
import './PageBuildDetails.scss';
import { useHistory, useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Page from '../../common/Page/Page';
import Header from '../../common/Header/Header';
import Button from '../../common/Button/Button';
import Footer from '../../common/Footer/Footer';
import Card from '../../common/Card/Card';
import { getBuildLogRequest, getBuildRequest, runBuildRequest } from '../../../store/actions';

const PageBuildDetails = () => {
    const { buildId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const { settings, fetching, buildList, buildLogs } = useSelector((state) => state, shallowEqual);

    const build = useMemo(
        () => buildList.find(({ id }) => id === buildId),
        [buildList, buildId],
    );
    const buildLog = buildLogs[buildId];

    useEffect(
        () => {
            if (buildId && !build) {
                dispatch(getBuildRequest(buildId));
            }
        },
        [dispatch, buildId, build],
    );
    useEffect(
        () => {
            if (build && build.status === 'Success' && !buildLog) {
                dispatch(getBuildLogRequest(buildId));
            }
        },
        [dispatch, buildId, buildLog, build],
    );

    const onClickButtonSettings = () => {
        history.push('/settings');
    };

    const onClickButtonRebuild = async () => {
        if (!build) return;

        const { commitHash } = build;
        const newBuildId = await runBuildRequest(commitHash);

        if (newBuildId) {
            history.push(`/build/${newBuildId}`);
        }
    };

    const renderCard = () => {
        if (!build) return 'Нет данных';
        const { buildNumber, status, commitMessage, commitHash, branchName, authorName } = build;

        return (
            <Card number={buildNumber}
                  status={status}
                  description={commitMessage}
                  branch={branchName}
                  commitHash={commitHash}
                  author={authorName}
                  date={build.start}
                  duration={build.duration}
            />
        );
    };

    const renderBuildLog = () => {
        if (!build || build.status !== 'Success') return null;

        return (
            <pre className="PageBuildDetails-Log">
                {buildLog || 'Загрузка'}
            </pre>
        );
    };

    return (
        <Page>
            <Header title={settings.repoName} titleType="build">
                <Button size="s"
                        type="default"
                        icon="rebuild"
                        text="Rebuild"
                        onClick={onClickButtonRebuild}
                        disabled={fetching || !build}
                        mixedClassNames="PageBuildHistory-Button_space_right"
                />
                <Button size="s"
                        type="default"
                        icon="settings"
                        onClick={onClickButtonSettings}
                        disabled={fetching}
                />
            </Header>
            <div className="Page-Content">
                {renderCard()}
                {renderBuildLog()}
            </div>
            <Footer />
        </Page>
    );
};

export default PageBuildDetails;
