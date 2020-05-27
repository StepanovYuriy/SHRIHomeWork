import React, { useEffect, useMemo } from 'react';
import './PageBuildDetails.scss';
import { useHistory, useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Page from '../../common/Page/Page';
import Header, { TitleType } from '../../common/Header/Header';
import Button, { Icon, Size, Type } from '../../common/Button/Button';
import Footer from '../../common/Footer/Footer';
import Card from '../../common/Card/Card';
import { getBuildLogRequest, getBuildRequest, runBuildRequest } from '../../../store/actions';
import { Build, RootState } from '../../../store/initialState';

const PageBuildDetails: React.FC = () => {
    const { buildId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    const { settings, fetching, buildList, buildLogs } = useSelector((state: RootState) => state, shallowEqual);

    const build: Build | undefined = useMemo(
        () => buildList.find(({ id }: Build) => id === buildId),
        [buildList, buildId],
    );
    const buildLog: string = buildId ? buildLogs[buildId] : '';

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
            if (buildId && build && build.status === 'Success' && !buildLog) {
                dispatch(getBuildLogRequest(buildId));
            }
        },
        [dispatch, buildId, buildLog, build],
    );

    const onClickButtonSettings = (): void => {
        history.push('/settings');
    };

    const onClickButtonRebuild = async (): Promise<any> => {
        if (!build) return;

        const { commitHash } = build;
        const newBuildId = await runBuildRequest(commitHash);

        if (newBuildId) {
            history.push(`/build/${newBuildId}`);
        }
    };

    const renderCard = (): React.ReactElement | string => {
        if (!build) return t('noData');
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

    const renderBuildLog = (): React.ReactElement | null => {
        if (!build || build.status !== 'Success') return null;

        return (
            <pre className="PageBuildDetails-Log">
                {buildLog || t('loading')}
            </pre>
        );
    };

    return (
        <Page>
            <Header title={settings.repoName} titleType={TitleType.build}>
                <Button size={Size.s}
                        type={Type.action}
                        icon={Icon.rebuild}
                        text={t('rebuild')}
                        onClick={onClickButtonRebuild}
                        disabled={fetching || !build}
                        mixedClassNames="PageBuildHistory-Button_space_right"
                />
                <Button size={Size.s}
                        type={Type.default}
                        icon={Icon.settings}
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
