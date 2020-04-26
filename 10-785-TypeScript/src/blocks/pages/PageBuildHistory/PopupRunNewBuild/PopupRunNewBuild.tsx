import React, { useState } from 'react';
import './PopupRunNewBuild.scss';
import { useHistory } from 'react-router-dom';
import Popup from '../../../common/Popup/Popup';
import Input from '../../../common/Input/Input';
import Button, { Size, Type } from '../../../common/Button/Button';
import { runBuildRequest } from '../../../../store/actions';

export interface PopupRunNewBuildProps {
    closePopup(): void;
}

const PopupRunNewBuild: React.FC<PopupRunNewBuildProps> = (props) => {
    const { closePopup } = props;

    const history = useHistory();
    const [fetching, setFetching] = useState(false);
    const [commitHash, setCommitHash] = useState('');

    const onClickButtonRunBuild = async (): Promise<any> => {
        setFetching(true);

        const newBuildId = await runBuildRequest(commitHash);
        if (newBuildId) {
            history.push(`/build/${newBuildId}`);
        }
    };

    const onClickButtonCancel = (): void => {
        closePopup();
    };

    const onChangeCommitHash = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCommitHash(event.target.value);
    };

    return (
        <Popup>
            <div className="PopupRunNewBuild-Header">
                New build
            </div>
            <div className="PopupRunNewBuild-Content">
                <div className="PopupRunNewBuild-Description">
                    Enter the commit hash which you want to build.
                </div>
                <Input value={commitHash}
                       onChange={onChangeCommitHash}
                       placeholder="Commit hash"
                />
            </div>
            <div className="PopupRunNewBuild-Footer">
                <Button size={Size.m}
                        type={Type.action}
                        text="Run build"
                        onClick={onClickButtonRunBuild}
                        disabled={fetching || commitHash === '' || commitHash.length > 40}
                        mixedClassNames="PopupRunNewBuild-Button_space_right"
                />
                <Button size={Size.m}
                        type={Type.default}
                        text="Cancel"
                        onClick={onClickButtonCancel}
                        disabled={fetching}
                />
            </div>
        </Popup>
    );
};

export default PopupRunNewBuild;
