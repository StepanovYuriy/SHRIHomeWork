import React from 'react';
import './PageSettings.scss';
import Page from '../../common/Page/Page';
import Header from '../../common/Header/Header';
import Footer from '../../common/Footer/Footer';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const PageSettings = () => (
    <Page>
        <Header title="School CI server" titleType="settings" />
        <div className="Page-Content PageSettings-Form">
            <div className="PageSettings-Title">
                Settings
            </div>
            <div className="PageSettings-Description">
                Configure repository connection and synchronization settings.
            </div>
            <Input label="GitHub repository"
                   placeholder="user-name/repo-name"
                   required
            />
            <Input value="npm ci && npm run build"
                   label="Build command"
                   mixedClassNames="PageSettings-Field_space_top"
            />
            <Input value="master |"
                   label="Main branch"
                   mixedClassNames="PageSettings-Field_space_top"
            />
            <div className="PageSettings-Field PageSettings-Field_space_top">
                <div className="PageSettings-Label">Synchronize every</div>
                <Input value={10}
                       textRight
                       mixedClassNames="PageSettings-NumberInput"
                />
                <div className="PageSettings-Label">minutes</div>
            </div>
            <div className="PageSettings-Buttons">
                <Button size="m"
                        type="action"
                        text="Save"
                        mixedClassNames="PageSettings-Button_space_right"
                />
                <Button size="m" type="default" text="Cancel" />
            </div>
        </div>
        <Footer />
    </Page>
);

export default PageSettings;
