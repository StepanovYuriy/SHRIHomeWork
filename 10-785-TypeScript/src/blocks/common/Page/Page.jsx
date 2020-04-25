import React from 'react';
import PropTypes from 'prop-types';
import './Page.scss';

const Page = ({ children }) => (
    <div className="Page">
        {children}
    </div>
);

Page.propTypes = {
    children: PropTypes.node,
};

Page.defaultProps = {
    children: null,
};

export default Page;
