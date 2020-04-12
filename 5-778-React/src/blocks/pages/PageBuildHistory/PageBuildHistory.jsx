import React, { useEffect, useState } from 'react';
import './PageBuildHistory.scss';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Page from '../../common/Page/Page';
import Header from '../../common/Header/Header';
import Button from '../../common/Button/Button';
import Footer from '../../common/Footer/Footer';
import Card from '../../common/Card/Card';
import { getBuildListRequest } from '../../../store/actions';
import PopupRunNewBuild from './PopupRunNewBuild/PopupRunNewBuild';

const PageBuildHistory = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { settings, fetching, buildList, buildsNotFound } = useSelector((state) => state, shallowEqual);
    const [popupIsOpened, setPopupIsOpened] = useState(false);

    useEffect(
        () => {
            if (!buildList.length && !buildsNotFound) {
                dispatch(getBuildListRequest());
            }
        },
        [dispatch, buildList, buildsNotFound],
    );

    const onClickButtonSettings = () => {
        history.push('/settings');
    };

    const onClickCard = (id) => {
        history.push(`/build/${id}`);
    };

    const onClickButtonRunBuild = () => {
        setPopupIsOpened(true);
    };

    const onClosePopup = () => {
        setPopupIsOpened(false);
    };

    const onClickButtonShowMore = () => {
        dispatch(getBuildListRequest());
    };

    const renderBuildList = () => {
        if (buildsNotFound) return 'Записи отсутствуют';
        if (fetching && !buildList.length) return 'Загрузка';

        return (
            <>
                {buildList.map((build) => (
                    <Card key={build.id}
                          number={build.buildNumber}
                          status={build.status}
                          description={build.commitMessage}
                          branch={build.branchName}
                          commitHash={build.commitHash}
                          author={build.authorName}
                          date={build.start}
                          duration={build.duration}
                          onClick={() => onClickCard(build.id)}
                          mixedClassNames="PageBuildHistory-ListItem"
                    />
                ))}
                <div className="PageBuildHistory-ButtonMore">
                    <Button size="s"
                            type="default"
                            text="Show more"
                            disabled={fetching}
                            onClick={onClickButtonShowMore}
                    />
                </div>
            </>
        );
    };

    return (
        <Page>
            <Header title={settings.repoName} titleType="build">
                {popupIsOpened ? <PopupRunNewBuild closePopup={onClosePopup} /> : null}
                <Button size="s"
                        type="default"
                        icon="run"
                        text="Run build"
                        onClick={onClickButtonRunBuild}
                        mixedClassNames="PageBuildHistory-Button_space_right"
                />
                <Button size="s"
                        type="default"
                        icon="settings"
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
