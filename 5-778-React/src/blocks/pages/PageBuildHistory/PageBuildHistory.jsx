import React from 'react';
import './PageBuildHistory.scss';
import Page from '../../common/Page/Page';
import Header from '../../common/Header/Header';
import Button from '../../common/Button/Button';
import Footer from '../../common/Footer/Footer';
import Card from '../../common/Card/Card';

const PageBuildHistory = () => (
    <Page>
        <Header title="philip1967/my-awesome-repo" titleType="build">
            <Button size="s"
                    type="default"
                    icon="run"
                    text="Run build"
                    mixedClassNames="PageBuildHistory-Button_space_right"
            />
            <Button size="s" type="default" icon="settings" />
        </Header>
        <div className="Page-Content">
            <Card status="done"
                  number={1368}
                  description="add documentation for postgres scaler"
                  branch="master"
                  commitHash="9c9f0b9"
                  author="Philip Kirkorov"
                  date="21 янв, 03:06"
                  duration="1 ч 20 мин"
                  mixedClassNames="PageBuildHistory-ListItem"
            />
            <div className="PageBuildHistory-ButtonMore">
                <Button size="s" type="default" text="Show more" />
            </div>
        </div>
        <Footer />
    </Page>
);

export default PageBuildHistory;
