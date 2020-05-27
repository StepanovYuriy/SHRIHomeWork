import React from 'react';
import './PageStartScreen.scss';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Page from '../../common/Page/Page';
import Header, { TitleType } from '../../common/Header/Header';
import Button, { Icon, Size, Type } from '../../common/Button/Button';
import Footer from '../../common/Footer/Footer';
import { ReactComponent as BuildSettingsImage } from '../../../images/build_settings_124.svg';

const PageStartScreen: React.FC = () => {
    const history = useHistory();
    const { t } = useTranslation();

    const onClickButtonSettings = (): void => {
        history.push('/settings');
    };

    return (
        <Page>
            <Header title={t('schoolServer')} titleType={TitleType.settings}>
                <Button size={Size.s}
                        type={Type.default}
                        icon={Icon.settings}
                        text={t('settings')}
                        onClick={onClickButtonSettings}
                />
            </Header>
            <div className="Page-Content Page-Content_align_center">
                <BuildSettingsImage className="PageStartScreen-Image" />
                <div className="PageStartScreen-Text">
                    {t('configureSettings')}
                </div>
                <Button size={Size.m}
                        type={Type.action}
                        text={t('openSettings')}
                        onClick={onClickButtonSettings}
                        mixedClassNames="PageStartScreen-Button_space_bottom"
                />
            </div>
            <Footer />
        </Page>
    );
};

export default PageStartScreen;
