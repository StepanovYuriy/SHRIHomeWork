import React from 'react';
import PropTypes from 'prop-types';
import './Link.scss';
import cn from 'classnames';

const Link = ({ name, href, mixedClassNames }) => (
    <a href={href} className={cn('Link', mixedClassNames)}>
        {name}
    </a>
);

Link.propTypes = {
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    mixedClassNames: PropTypes.string,
};

Link.defaultProps = {
    mixedClassNames: null,
};

export default Link;
