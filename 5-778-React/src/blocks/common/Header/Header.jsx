import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import cn from 'classnames';

const TITLE_TYPES = ['settings', 'build'];

const Header = ({ title, titleType, children }) => (
    <div className="Header">
        <div className={cn(
            'Header-Title', {
                [`Header-Title_type_${titleType}`]: TITLE_TYPES.includes(titleType),
            },
        )}
        >
            {title}
        </div>
        {children}
    </div>
);

Header.propTypes = {
    title: PropTypes.string,
    titleType: PropTypes.oneOf(TITLE_TYPES),
    children: PropTypes.node,
};

Header.defaultProps = {
    title: '',
    titleType: null,
    children: null,
};

export default Header;
