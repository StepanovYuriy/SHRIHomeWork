import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PageStartScreen from '../PageStartScreen/PageStartScreen';
import PageBuildHistory from '../PageBuildHistory/PageBuildHistory';
import { getSettingsRequest } from '../../../store/actions';

const PageMain = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings, shallowEqual);

    useEffect(
        () => {
            if (!settings) {
                dispatch(getSettingsRequest());
            }
        },
        [settings, dispatch],
    );
    // TODO По хорошему надо сделать более качественную проверку настроек.
    // И скорее всего вообще сделать редирект по другому. Без лишнего файла

    return (settings ? <PageBuildHistory /> : <PageStartScreen />);
};

export default PageMain;
