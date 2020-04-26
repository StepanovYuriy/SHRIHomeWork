import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PageStartScreen from '../PageStartScreen/PageStartScreen';
import PageBuildHistory from '../PageBuildHistory/PageBuildHistory';
import { getSettingsRequest } from '../../../store/actions';
import { RootState } from '../../../store/initialState';

const PageMain: React.FC = () => {
    const dispatch = useDispatch();
    const { settings } = useSelector((state: RootState) => state, shallowEqual);

    useEffect(
        () => {
            if (!settings.id) {
                dispatch(getSettingsRequest());
            }
        },
        [settings, dispatch],
    );
    // TODO По хорошему надо сделать более качественную проверку настроек.
    // И скорее всего вообще сделать редирект по другому. Без лишнего файла

    return (settings.id ? <PageBuildHistory /> : <PageStartScreen />);
};

export default PageMain;
