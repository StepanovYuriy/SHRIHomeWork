/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
    id?: string;
    children: React.ReactNode;
    className: string;
}

const Portal: React.FC<PortalProps> = (props) => {
    const {
        id = '',
        children,
        className = '',
    } = props;

    const element: React.MutableRefObject<HTMLElement> = useRef(document.getElementById(id) || document.createElement('div'));
    const [dynamic] = useState(!element.current.parentElement);

    useEffect(() => {
        element.current.className = className;

        if (dynamic) {
            element.current.id = id;
            document.body.appendChild(element.current);
        }

        return (): void => {
            if (dynamic && element.current.parentElement) {
                element.current.parentElement.removeChild(element.current);
            }
        };
    }, [id, dynamic, className]);

    return createPortal(children, element.current);
};

export default memo(Portal);
