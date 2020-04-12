import React from 'react';
import './PageStartScreen.scss';
import { useHistory } from 'react-router-dom';
import Page from '../../common/Page/Page';
import Header from '../../common/Header/Header';
import Button from '../../common/Button/Button';
import Footer from '../../common/Footer/Footer';
import { ReactComponent as BuildSettingsImage } from '../../../images/build_settings_124.svg';

const PageStartScreen = () => {
    const history = useHistory();

    const onClickButtonSettings = () => {
        history.push('/settings');
    };

    return (
        <Page>
            <Header title="School CI server" titleType="settings">
                <Button size="s"
                        type="default"
                        icon="settings"
                        text="Settings"
                        onClick={onClickButtonSettings}
                />
            </Header>
            <div className="Page-Content Page-Content_align_center">
                <BuildSettingsImage className="PageStartScreen-Image" />
                <div className="PageStartScreen-Text">
                    Configure repository connection and synchronization settings
                </div>
                <Button size="m"
                        type="action"
                        text="Open settings"
                        onClick={onClickButtonSettings}
                        mixedClassNames="PageStartScreen-Button_space_bottom"
                />
            </div>
            <Footer />
        </Page>
    );
};

export default PageStartScreen;
