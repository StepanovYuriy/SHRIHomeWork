import React, { useMemo } from 'react';
import './Popup.scss';
import Portal from '../Portal/Portal';

export interface PopupProps {
    children: React.ReactNode;
    popupClassName?: string;
    containerClassName?: string;
}

const Popup: React.FC<PopupProps> = (props) => {
    const {
        children,
        popupClassName = 'Popup',
        containerClassName = 'PopupContainer',
    } = props;

    const id: string = useMemo(() => `PopupContainer-${Date.now() + Math.random().toFixed(5)}`, []);

    return (
        <Portal id={id} className={containerClassName}>
            <div className={popupClassName}>
                {children}
            </div>
        </Portal>
    );
};

export default Popup;
