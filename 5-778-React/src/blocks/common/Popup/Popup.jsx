import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';
import Portal from '../Portal/Portal';

const Popup = ({ children, popupClassName, containerClassName }) => {
    const id = useMemo(() => `PopupContainer-${Date.now() + Math.random().toFixed(5)}`, []);

    return (
        <Portal id={id} className={containerClassName}>
            <div className={popupClassName}>
                {children}
            </div>
        </Portal>
    );
};

Popup.propTypes = {
    children: PropTypes.node,
    popupClassName: PropTypes.string,
    containerClassName: PropTypes.string,
};

Popup.defaultProps = {
    children: null,
    popupClassName: 'Popup',
    containerClassName: 'PopupContainer',
};

export default Popup;
