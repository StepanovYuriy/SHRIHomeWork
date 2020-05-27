import React, { useEffect, useState } from 'react';
import './PageBuildHistory.scss';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Page from '../../common/Page/Page';
import Header, { TitleType } from '../../common/Header/Header';
import Button, { Icon, Size, Type } from '../../common/Button/Button';
import Footer from '../../common/Footer/Footer';
import Card from '../../common/Card/Card';
import { getBuildListRequest } from '../../../store/actions';
import PopupRunNewBuild from './PopupRunNewBuild/PopupRunNewBuild';
import { Build, RootState } from '../../../store/initialState';

const PageBuildHistory: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    const { settings, fetching, buildList, buildsNotFound } = useSelector((state: RootState) => state, shallowEqual);
    const [popupIsOpened, setPopupIsOpened] = useState(false);

    useEffect(
        () => {
            if (!buildList.length && !buildsNotFound) {
                dispatch(getBuildListRequest());
            }
        },
        [dispatch, buildList, buildsNotFound],
    );

    const onClickButtonSettings = (): void => {
        history.push('/settings');
    };

    const onClickCard = (id: string): void => {
        history.push(`/build/${id}`);
    };

    const onClickButtonRunBuild = (): void => {
        setPopupIsOpened(true);
    };

    const onClosePopup = (): void => {
        setPopupIsOpened(false);
    };

    const onClickButtonShowMore = (): void => {
        dispatch(getBuildListRequest());
    };

    const renderBuildList = (): React.ReactElement | string => {
        if (buildsNotFound) return 'Записи отсутствуют';
        if (fetching && !buildList.length) return t('loading');

        return (
            <>
                {buildList.map((build: Build) => (
                    <Card key={build.id}
                          number={build.buildNumber}
                          status={build.status}
                          description={build.commitMessage}
                          branch={build.branchName}
                          commitHash={build.commitHash}
                          author={build.authorName}
                          date={build.start}
                          duration={build.duration}
                          onClick={(): void => onClickCard(build.id)}
                          mixedClassNames="PageBuildHistory-ListItem"
                    />
                ))}
                <div className="PageBuildHistory-ButtonMore">
                    <Button size={Size.s}
                            type={Type.default}
                            text={t('showMore')}
                            disabled={fetching}
                            onClick={onClickButtonShowMore}
                    />
                </div>
            </>
        );
    };

    return (
        <Page>
            <Header title={settings.repoName} titleType={TitleType.build}>
                {popupIsOpened ? <PopupRunNewBuild closePopup={onClosePopup} /> : null}
                <Button size={Size.s}
                        type={Type.default}
                        icon={Icon.run}
                        text={t('runBuild')}
                        onClick={onClickButtonRunBuild}
                        mixedClassNames="PageBuildHistory-Button_space_right"
                />
                <Button size={Size.s}
                        type={Type.default}
                        icon={Icon.settings}
                        onClick={onClickButtonSettings}
                />
            </Header>
            <div className="Page-Content">
                {renderBuildList()}
            </div>
            <Footer />
        </Page>
    );
};

export default PageBuildHistory;
