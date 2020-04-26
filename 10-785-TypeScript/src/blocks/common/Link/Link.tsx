import React from 'react';
import './Link.scss';
import cn from 'classnames';

export interface LinkProps {
    name: string;
    href: string;
    mixedClassNames?: string;
}

const Link: React.FC<LinkProps> = (props) => {
    const {
        name,
        href,
        mixedClassNames = '',
    } = props;

    return (
        <a href={href} className={cn('Link', mixedClassNames)}>
            {name}
        </a>
    );
};

export default Link;
