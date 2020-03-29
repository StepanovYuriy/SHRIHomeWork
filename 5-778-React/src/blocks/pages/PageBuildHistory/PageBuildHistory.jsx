import React, { useEffect } from 'react';
import './PageBuildHistory.scss';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Page from '../../common/Page/Page';
import Header from '../../common/Header/Header';
import Button from '../../common/Button/Button';
import Footer from '../../common/Footer/Footer';
import Card from '../../common/Card/Card';
import { getBuildListRequest } from '../../../store/actions';

const PageBuildHistory = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => dispatch(getBuildListRequest()), [dispatch]);

    const { settings, fetching, buildList } = useSelector((state) => state, shallowEqual);

    const onClickButtonSettings = () => {
        history.push('/settings');
    };

    const onClickCard = (id) => {
        history.push(`/build/${id}`);
    };

    const onClickButtonRunBuild = () => null;
    const onClickButtonShowMore = () => null;

    const renderBuildList = () => {
        if (fetching) return 'Загрузка';
        if (!Array.isArray(buildList) || !buildList.length) return 'Записи отсутствуют';

        return (
            <>
                {buildList.map(({ id, buildNumber, commitMessage, commitHash, branchName, authorName }) => (
                    <Card key={id}
                          status="done"
                          number={buildNumber}
                          description={commitMessage}
                          branch={branchName}
                          commitHash={commitHash}
                          author={authorName}
                          date="21 янв, 03:06"
                          duration="1 ч 20 мин"
                          onClick={() => onClickCard(id)}
                          mixedClassNames="PageBuildHistory-ListItem"
                    />
                ))}
                <div className="PageBuildHistory-ButtonMore">
                    <Button size="s"
                            type="default"
                            text="Show more"
                            onClick={onClickButtonShowMore}
                    />
                </div>
            </>
        );
    };

    return (
        <Page>
            <Header title={settings.repoName} titleType="build">
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
