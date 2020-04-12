import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PopupRunNewBuild.scss';
import { useHistory } from 'react-router-dom';
import Popup from '../../../common/Popup/Popup';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import { runBuildRequest } from '../../../../store/actions';

const PopupRunNewBuild = ({ closePopup }) => {
    const history = useHistory();
    const [fetching, setFetching] = useState(false);
    const [commitHash, setCommitHash] = useState('');

    const onClickButtonRunBuild = async () => {
        setFetching(true);

        const newBuildId = await runBuildRequest(commitHash);
        if (newBuildId) {
            history.push(`/build/${newBuildId}`);
        }
    };

    const onClickButtonCancel = () => {
        closePopup();
    };

    const onChangeCommitHash = (event) => {
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
                <Button size="m"
                        type="action"
                        text="Run build"
                        onClick={onClickButtonRunBuild}
                        disabled={fetching || commitHash === '' || commitHash.length > 40}
                        mixedClassNames="PopupRunNewBuild-Button_space_right"
                />
                <Button size="m"
                        type="default"
                        text="Cancel"
                        onClick={onClickButtonCancel}
                        disabled={fetching}
                />
            </div>
        </Popup>
    );
};

PopupRunNewBuild.propTypes = {
    closePopup: PropTypes.func.isRequired,
};

export default PopupRunNewBuild;
