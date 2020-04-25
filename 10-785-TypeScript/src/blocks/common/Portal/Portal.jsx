/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ id, children, className }) => {
    const element = useRef(document.getElementById(id) || document.createElement('div'));
    const [dynamic] = useState(!element.current.parentElement);

    useEffect(() => {
        element.current.className = className;

        if (dynamic) {
            element.current.id = id;
            document.body.appendChild(element.current);
        }

        return () => {
            if (dynamic && element.current.parentElement) {
                element.current.parentElement.removeChild(element.current);
            }
        };
    }, [id, dynamic, className]);

    return createPortal(children, element.current);
};

Portal.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
};

Portal.defaultProps = {
    id: null,
    children: null,
    className: null,
};

export default memo(Portal);
